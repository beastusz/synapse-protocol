/**
 * Solana wallet adapter
 * Supports Phantom, Solflare, and Backpack via their browser injection APIs.
 * No external dependencies — uses the wallet providers injected into window.
 */

import { getBalance, getSignatures, getTransaction, LAMPORTS_PER_SOL } from './rpc.js'

export const SUPPORTED_WALLETS = [
  {
    id: 'phantom',
    name: 'Phantom',
    icon: '👻',
    color: 'rgba(171,111,255,.15)',
    description: 'Most popular Solana wallet',
    installUrl: 'https://phantom.app/',
    detect() {
      return window.phantom?.solana ?? (window.solana?.isPhantom ? window.solana : null)
    },
    async connect() {
      const provider = this.detect()
      if (!provider) throw new Error('Phantom not installed')
      const res = await provider.connect()
      return { provider, pubkey: res.publicKey.toString() }
    }
  },
  {
    id: 'solflare',
    name: 'Solflare',
    icon: '🔥',
    color: 'rgba(255,165,0,.12)',
    description: 'Browser & hardware wallet',
    installUrl: 'https://solflare.com/',
    detect() {
      return window.solflare?.isSolflare ? window.solflare : null
    },
    async connect() {
      const provider = this.detect()
      if (!provider) throw new Error('Solflare not installed')
      await provider.connect()
      return { provider, pubkey: provider.publicKey.toString() }
    }
  },
  {
    id: 'backpack',
    name: 'Backpack',
    icon: '🎒',
    color: 'rgba(255,100,80,.12)',
    description: 'By Coral / xNFT',
    installUrl: 'https://backpack.app/',
    detect() {
      return window.backpack?.isBackpack ? window.backpack : null
    },
    async connect() {
      const provider = this.detect()
      if (!provider) throw new Error('Backpack not installed')
      await provider.connect()
      return { provider, pubkey: provider.publicKey.toString() }
    }
  }
]

/**
 * Check which wallets are installed in the current browser
 * @returns {Array} list of wallet definitions with `installed` flag
 */
export function detectInstalledWallets() {
  return SUPPORTED_WALLETS.map(w => ({ ...w, installed: !!w.detect() }))
}

/**
 * Connect to a wallet by ID
 * @param {string} walletId
 * @returns {Promise<WalletSession>}
 */
export async function connectWallet(walletId) {
  const wallet = SUPPORTED_WALLETS.find(w => w.id === walletId)
  if (!wallet) throw new Error(`Unknown wallet: ${walletId}`)
  const { provider, pubkey } = await wallet.connect()
  const solBalance = await getBalance(pubkey)
  return new WalletSession({ name: wallet.name, provider, pubkey, solBalance })
}

/**
 * Represents an active wallet connection
 */
export class WalletSession {
  constructor({ name, provider, pubkey, solBalance }) {
    this.name = name
    this.provider = provider
    this.pubkey = pubkey
    this.solBalance = solBalance
    this.connected = true
  }

  get shortAddress() {
    return this.pubkey.slice(0, 4) + '…' + this.pubkey.slice(-4)
  }

  get solscanUrl() {
    return `https://solscan.io/account/${this.pubkey}`
  }

  async refreshBalance() {
    this.solBalance = await getBalance(this.pubkey)
    return this.solBalance
  }

  /**
   * Fetch transaction history with parsed SOL deltas
   * @param {number} limit
   * @returns {Promise<ParsedTransaction[]>}
   */
  async getTransactions(limit = 10) {
    const sigs = await getSignatures(this.pubkey, limit)
    const txs = await Promise.all(sigs.map(s => getTransaction(s.signature)))
    return sigs.map((sig, i) => parseTx(sig, txs[i], this.pubkey))
  }

  /**
   * Sign an arbitrary message (for verification / auth)
   * @param {string} message
   * @returns {Promise<string>} hex-encoded signature
   */
  async signMessage(message) {
    const encoded = new TextEncoder().encode(message)
    const result = await this.provider.signMessage(encoded, 'utf8')
    const bytes = result.signature ?? result
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')
  }

  disconnect() {
    this.provider?.disconnect?.()
    this.connected = false
  }

  onAccountChange(callback) {
    this.provider?.on?.('accountChanged', callback)
  }

  onDisconnect(callback) {
    this.provider?.on?.('disconnect', callback)
  }
}

/**
 * Parse a raw transaction into a human-readable format
 */
function parseTx(sig, tx, pubkey) {
  const ts = sig.blockTime ?? 0
  const err = sig.err || tx?.meta?.err

  // Compute SOL delta for our account
  let delta = null
  if (tx?.meta && tx.transaction?.message?.accountKeys) {
    const keys = tx.transaction.message.accountKeys
    const idx = keys.findIndex(k => (typeof k === 'string' ? k : k.pubkey) === pubkey)
    if (idx >= 0 && tx.meta.preBalances && tx.meta.postBalances) {
      delta = (tx.meta.postBalances[idx] - tx.meta.preBalances[idx]) / LAMPORTS_PER_SOL
    }
  }

  return {
    signature: sig.signature,
    shortSignature: sig.signature.slice(0, 8) + '…' + sig.signature.slice(-5),
    timestamp: ts,
    timeAgo: timeAgo(ts),
    err,
    delta,
    isIncoming: delta !== null && delta > 0,
    isOutgoing: delta !== null && delta < 0,
    label: err ? 'Failed transaction' : delta > 0 ? 'Received SOL' : delta < 0 ? 'Sent SOL' : 'Program interaction',
    solscanUrl: `https://solscan.io/tx/${sig.signature}`
  }
}

function timeAgo(ts) {
  const s = Math.floor(Date.now() / 1000 - ts)
  if (s < 60) return `${s}s ago`
  if (s < 3600) return `${Math.floor(s / 60)}m ago`
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`
  return `${Math.floor(s / 86400)}d ago`
}
