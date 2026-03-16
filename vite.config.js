/**
 * Solana RPC API
 * Wraps JSON-RPC calls to the configured endpoint
 */

export let RPC_URL = 'https://api.mainnet-beta.solana.com'
export const LAMPORTS_PER_SOL = 1_000_000_000

export function setRpcUrl(url) {
  RPC_URL = url
}

async function call(method, params = []) {
  try {
    const res = await fetch(RPC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params })
    })
    return res.json()
  } catch (err) {
    console.error(`RPC error [${method}]:`, err)
    return { result: null }
  }
}

/**
 * Get SOL balance for a public key
 * @param {string} pubkey
 * @returns {Promise<number>} balance in SOL
 */
export async function getBalance(pubkey) {
  const { result } = await call('getBalance', [pubkey])
  return (result?.value ?? 0) / LAMPORTS_PER_SOL
}

/**
 * Get current epoch info: epoch, slot, slotIndex, slotsInEpoch
 * @returns {Promise<object>}
 */
export async function getEpochInfo() {
  const { result } = await call('getEpochInfo')
  return result ?? {}
}

/**
 * Get recent performance samples to compute TPS
 * @param {number} limit number of samples (default 5)
 * @returns {Promise<number>} transactions per second
 */
export async function getNetworkTps(limit = 5) {
  const { result } = await call('getRecentPerformanceSamples', [limit])
  const samples = result ?? []
  if (!samples.length) return 0
  const avg = samples.reduce((s, x) => s + x.numTransactions / x.samplePeriodSecs, 0) / samples.length
  return Math.round(avg)
}

/**
 * Get total validator count (current + delinquent)
 * @returns {Promise<number>}
 */
export async function getValidatorCount() {
  const { result } = await call('getVoteAccounts')
  if (!result) return 0
  return (result.current?.length ?? 0) + (result.delinquent?.length ?? 0)
}

/**
 * Get recent transaction signatures for an address
 * @param {string} pubkey
 * @param {number} limit
 * @returns {Promise<Array>}
 */
export async function getSignatures(pubkey, limit = 10) {
  const { result } = await call('getSignaturesForAddress', [pubkey, { limit }])
  return result ?? []
}

/**
 * Get a full transaction by signature
 * @param {string} signature
 * @returns {Promise<object|null>}
 */
export async function getTransaction(signature) {
  const { result } = await call('getTransaction', [
    signature,
    { encoding: 'json', maxSupportedTransactionVersion: 0 }
  ])
  return result
}

/**
 * Fetch all network stats in one parallel call
 * @returns {Promise<{tps, validators, epoch, slot, slotIndex, slotsPerEpoch}>}
 */
export async function getNetworkStats() {
  const [tps, epochInfo, validators] = await Promise.all([
    getNetworkTps(),
    getEpochInfo(),
    getValidatorCount()
  ])
  return {
    tps,
    validators,
    epoch: epochInfo.epoch ?? 0,
    slot: epochInfo.absoluteSlot ?? 0,
    slotIndex: epochInfo.slotIndex ?? 0,
    slotsPerEpoch: epochInfo.slotsInEpoch ?? 432000
  }
}
