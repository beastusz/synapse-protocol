/**
 * Formatting utilities
 */

/**
 * Shorten a Solana public key for display
 * @param {string} address
 * @param {number} chars chars to show on each end
 */
export function shortAddress(address, chars = 4) {
  if (!address) return ''
  return address.slice(0, chars) + '…' + address.slice(-chars)
}

/**
 * Format a number as USD
 * @param {number} value
 * @param {number} decimals
 */
export function formatUsd(value, decimals = 2) {
  return '$' + (value ?? 0).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })
}

/**
 * Format a SOL amount
 * @param {number} sol
 */
export function formatSol(sol) {
  return (sol ?? 0).toFixed(4) + ' SOL'
}

/**
 * Format a large number with K/M suffix
 * @param {number} n
 */
export function formatCompact(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K'
  return n.toString()
}

/**
 * Convert a Unix timestamp to a human-readable "time ago" string
 * @param {number} timestamp unix seconds
 */
export function timeAgo(timestamp) {
  const secs = Math.floor(Date.now() / 1000 - timestamp)
  if (secs < 60) return `${secs}s ago`
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`
  return `${Math.floor(secs / 86400)}d ago`
}

/**
 * Compute epoch time remaining
 * @param {number} slotIndex current slot within epoch
 * @param {number} slotsPerEpoch total slots in epoch
 * @returns {{ hours: number, minutes: number, label: string }}
 */
export function epochTimeRemaining(slotIndex, slotsPerEpoch) {
  const slotsLeft = slotsPerEpoch - slotIndex
  const secLeft = slotsLeft * 0.4 // ~400ms per slot
  const hours = Math.floor(secLeft / 3600)
  const minutes = Math.floor((secLeft % 3600) / 60)
  const label = hours > 0 ? `~${hours}h ${minutes}m` : `~${minutes}m`
  return { hours, minutes, label }
}

/**
 * Format a SOL delta (positive = received, negative = sent)
 * @param {number|null} delta
 */
export function formatDelta(delta) {
  if (delta === null) return ''
  const sign = delta > 0 ? '+' : ''
  return sign + delta.toFixed(6) + ' SOL'
}
