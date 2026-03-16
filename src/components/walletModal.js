/**
 * Wallet connect modal
 */

import { detectInstalledWallets, connectWallet } from '../api/wallet.js'
import { openModal, closeModal } from './modal.js'
import { showToast } from './toast.js'

let currentSession = null
let onConnectCallback = null
let onDisconnectCallback = null

/**
 * Register callbacks for wallet events
 * @param {{ onConnect: Function, onDisconnect: Function }}
 */
export function initWalletModal({ onConnect, onDisconnect }) {
  onConnectCallback = onConnect
  onDisconnectCallback = onDisconnect
}

export function openWalletModal() {
  if (currentSession?.connected) {
    renderConnected()
  } else {
    renderWalletList()
  }
  openModal('wallet-modal')
}

export function getSession() {
  return currentSession
}

function renderWalletList() {
  const body = document.getElementById('wallet-body')
  if (!body) return
  const wallets = detectInstalledWallets()

  body.innerHTML = `
    <p class="modal-desc">Connect a Solana wallet to use the app.</p>
    <div class="wallet-list" id="wallet-list"></div>`

  const list = document.getElementById('wallet-list')
  wallets.forEach(w => {
    const btn = document.createElement('button')
    btn.className = 'wallet-btn'
    btn.innerHTML = `
      <div class="wallet-icon" style="background:${w.color}">${w.icon}</div>
      <div class="wallet-info">
        <div class="wallet-name">${w.name}
          ${!w.installed ? '<span class="badge-not-installed">NOT INSTALLED</span>' : ''}
        </div>
        <div class="wallet-desc">${w.description}</div>
      </div>
      <span class="wallet-arrow">${w.installed ? '→' : '↗'}</span>`

    btn.addEventListener('click', () => {
      if (w.installed) {
        attemptConnect(w.id)
      } else {
        window.open(w.installUrl, '_blank', 'noopener,noreferrer')
        showToast('info', `Install ${w.name}`, 'Refresh the page after installing')
      }
    })
    list.appendChild(btn)
  })
}

async function attemptConnect(walletId) {
  const body = document.getElementById('wallet-body')
  if (!body) return
  const name = walletId.charAt(0).toUpperCase() + walletId.slice(1)
  body.innerHTML = `
    <div class="wallet-connecting">
      <div class="spinner"></div>
      <p>Connecting to ${name}…</p>
    </div>`

  try {
    const session = await connectWallet(walletId)
    currentSession = session
    session.onAccountChange(pk => {
      if (!pk) { handleDisconnect(); return }
      session.pubkey = pk.toString()
      session.refreshBalance().then(() => {
        renderConnected()
        onConnectCallback?.(session)
      })
    })
    session.onDisconnect(handleDisconnect)
    renderConnected()
    onConnectCallback?.(session)
    showToast('success', `${session.name} connected`, session.shortAddress)
  } catch (err) {
    renderWalletList()
    showToast('error', 'Connection failed', err.code === 4001 ? 'Rejected in wallet' : err.message)
  }
}

function renderConnected() {
  const s = currentSession
  if (!s) return
  const body = document.getElementById('wallet-body')
  if (!body) return
  body.innerHTML = `
    <p class="modal-desc">Connected via <strong>${s.name}</strong></p>
    <div class="wallet-address" id="wallet-address-copy" title="Click to copy">
      ${s.shortAddress} <span class="copy-hint">copy</span>
    </div>
    <div class="balance-list">
      <div class="balance-row"><span>SOL balance</span><span>${s.solBalance.toFixed(4)} SOL</span></div>
      <div class="balance-row"><span>Network</span><span class="text-lime">Mainnet</span></div>
    </div>
    <a href="${s.solscanUrl}" target="_blank" rel="noopener" class="solscan-link">
      View on Solscan ↗
    </a>
    <button class="btn-disconnect" id="btn-disconnect">Disconnect wallet</button>`

  document.getElementById('wallet-address-copy')?.addEventListener('click', () => {
    navigator.clipboard.writeText(s.pubkey).then(() =>
      showToast('success', 'Address copied', s.pubkey.slice(0, 12) + '…')
    )
  })
  document.getElementById('btn-disconnect')?.addEventListener('click', () => {
    s.disconnect()
    handleDisconnect()
    closeModal('wallet-modal')
  })
}

function handleDisconnect() {
  currentSession = null
  onDisconnectCallback?.()
  showToast('info', 'Wallet disconnected', '')
}
