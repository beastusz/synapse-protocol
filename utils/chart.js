/**
 * Lightweight canvas price chart renderer
 * No external charting library — pure Canvas 2D API
 */

/**
 * Render a price chart onto a canvas element
 * @param {HTMLCanvasElement} canvas
 * @param {number[]} prices array of price points
 * @param {object} options
 */
export function renderPriceChart(canvas, prices, options = {}) {
  const {
    lineColor = null,        // auto-detected from price direction if null
    fillOpacity = 0.18,
    padding = { top: 8, bottom: 8, left: 0, right: 0 }
  } = options

  if (!canvas || !prices || prices.length < 2) return

  const W = canvas.offsetWidth || 500
  const H = canvas.offsetHeight || 200
  canvas.width = W * devicePixelRatio
  canvas.height = H * devicePixelRatio

  const ctx = canvas.getContext('2d')
  ctx.scale(devicePixelRatio, devicePixelRatio)
  ctx.clearRect(0, 0, W, H)

  const minV = Math.min(...prices)
  const maxV = Math.max(...prices)
  const range = maxV - minV || 1

  const innerH = H - padding.top - padding.bottom
  const innerW = W - padding.left - padding.right

  const sx = i => padding.left + (i / (prices.length - 1)) * innerW
  const sy = v => padding.top + (1 - (v - minV) / range) * innerH

  const isUp = prices[prices.length - 1] >= prices[0]
  const color = lineColor ?? (isUp ? '#c2f751' : '#f87171')
  const fillBase = isUp ? `rgba(194,247,81,${fillOpacity})` : `rgba(248,113,113,${fillOpacity})`
  const fillEnd = isUp ? 'rgba(194,247,81,0)' : 'rgba(248,113,113,0)'

  // Gradient fill under the line
  const grad = ctx.createLinearGradient(0, 0, 0, H)
  grad.addColorStop(0, fillBase)
  grad.addColorStop(1, fillEnd)

  ctx.beginPath()
  ctx.moveTo(sx(0), sy(prices[0]))
  prices.forEach((p, i) => { if (i) ctx.lineTo(sx(i), sy(p)) })
  ctx.lineTo(sx(prices.length - 1), H)
  ctx.lineTo(sx(0), H)
  ctx.closePath()
  ctx.fillStyle = grad
  ctx.fill()

  // Line
  ctx.beginPath()
  ctx.moveTo(sx(0), sy(prices[0]))
  prices.forEach((p, i) => { if (i) ctx.lineTo(sx(i), sy(p)) })
  ctx.strokeStyle = color
  ctx.lineWidth = 1.5
  ctx.lineJoin = 'round'
  ctx.stroke()

  // Terminal dot
  const lx = sx(prices.length - 1)
  const ly = sy(prices[prices.length - 1])
  ctx.beginPath()
  ctx.arc(lx, ly, 4, 0, Math.PI * 2)
  ctx.fillStyle = color
  ctx.fill()

  // Halo around dot
  ctx.beginPath()
  ctx.arc(lx, ly, 8, 0, Math.PI * 2)
  ctx.fillStyle = isUp ? 'rgba(194,247,81,0.2)' : 'rgba(248,113,113,0.2)'
  ctx.fill()
}
