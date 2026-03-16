/**
 * Jupiter Aggregator integration
 * Provides swap quotes and executes swaps via Jupiter's API and UI
 *
 * Jupiter is the main DEX aggregator on Solana.
 * $SYN is not yet on mainnet so we redirect to Jupiter's UI
 * instead of executing via the API directly. Once $SYN has a
 * mint address, replace SYN_MINT and enable the quote/swap API.
 */

const JUPITER_API = 'https://quote-api.jup.ag/v6'
const JUPITER_UI = 'https://jup.ag/swap'

// SOL mint address
export const SOL_MINT = 'So11111111111111111111111111111111111111112'

// $SYN mint — replace with real address after token launch
export const SYN_MINT = 'SYNxxxx' // TODO: update after mainnet launch

/**
 * Get a swap quote from Jupiter
 * Currently returns a notional estimate since $SYN isn't on mainnet.
 * When SYN_MINT is set, this will use the real Jupiter Quote API.
 *
 * @param {number} solAmount amount of SOL to swap
 * @returns {Promise<SwapQuote>}
 */
export async function getSwapQuote(solAmount) {
  // Once $SYN is on mainnet, uncomment this block:
  /*
  const inputMint = SOL_MINT
  const outputMint = SYN_MINT
  const amount = Math.floor(solAmount * 1e9) // lamports
  const url = `${JUPITER_API}/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=50`
  const res = await fetch(url)
  const data = await res.json()
  return {
    inputAmount: solAmount,
    outputAmount: data.outAmount / 1e6, // adjust for SYN decimals
    priceImpact: parseFloat(data.priceImpactPct),
    route: data
  }
  */

  // Notional rate until mainnet
  const RATE = 193.33
  return {
    inputAmount: solAmount,
    outputAmount: solAmount * RATE,
    priceImpact: 0.001,
    rate: RATE,
    isNotional: true
  }
}

/**
 * Open Jupiter UI to execute a swap
 * @param {number} solAmount
 */
export function openJupiterSwap(solAmount) {
  const url = `${JUPITER_UI}/SOL-SYN?inAmount=${solAmount}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

/**
 * Build a deep link to Jupiter with pre-filled amounts
 * @param {string} inputMint
 * @param {string} outputMint
 * @param {number} amount
 * @returns {string}
 */
export function jupiterDeepLink(inputMint = 'SOL', outputMint = 'SYN', amount = 0) {
  return `${JUPITER_UI}/${inputMint}-${outputMint}?inAmount=${amount}`
}
