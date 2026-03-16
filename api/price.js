/**
 * Price data from CoinGecko (free, no API key needed)
 * Covers: current SOL price, 24h change, historical chart data
 */

const BASE = 'https://api.coingecko.com/api/v3'

async function cg(path) {
  try {
    const res = await fetch(BASE + path)
    return res.json()
  } catch (err) {
    console.error('CoinGecko error:', err)
    return null
  }
}

/**
 * Get current SOL price and 24h change
 * @returns {Promise<{price: number, change24h: number}>}
 */
export async function getSolPrice() {
  const data = await cg(
    '/coins/solana?localization=false&tickers=false&community_data=false&developer_data=false'
  )
  if (!data) return { price: 0, change24h: 0 }
  return {
    price: data.market_data?.current_price?.usd ?? 0,
    change24h: data.market_data?.price_change_percentage_24h ?? 0
  }
}

/**
 * Get historical price chart data for SOL
 * @param {'1H'|'1D'|'1W'|'1M'} timeframe
 * @returns {Promise<number[]>} array of price points
 */
export async function getPriceChart(timeframe) {
  const daysMap = { '1H': '1', '1D': '1', '1W': '7', '1M': '30' }
  const days = daysMap[timeframe] ?? '1'
  const data = await cg(`/coins/solana/market_chart?vs_currency=usd&days=${days}`)
  if (!data?.prices) return []
  const prices = data.prices.map(([, p]) => p)
  // For 1H, return only the last 60 data points
  return timeframe === '1H' ? prices.slice(-60) : prices
}
