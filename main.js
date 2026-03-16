/**
 * Synapse Protocol — App Entry Point
 *
 * Wires together all modules:
 *  - Wallet connect (Phantom / Solflare / Backpack)
 *  - Live Solana network stats (RPC)
 *  - SOL price + chart (CoinGecko)
 *  - Transaction history (RPC)
 *  - Swap (Jupiter)
 *  - Node registration wizard
 */

import { getNetworkStats } from './api/rpc.js'
import { getSolPrice, getPriceChart } from './api/price.js'
import { openJupiterSwap, getSwapQuote } from './api/jupiter.js'
import { getSession, openWalletModal, initWalletModal } from './components/walletModal.js'
import { openModal, closeModal, initModals } from './components/modal.js'
import { showToast, mountToast } from './components/toast.js'
import { renderPriceChart } from './utils/chart.js'
import { shortAddress, formatUsd, formatSol, formatCompact, epochTimeRemaining, formatDelta } from './utils/format.js'

// ── STATE ────────────────────────────────────────────────
const state = {
  solPrice: 0,
  solChange24h: 0,
  tps: 0,
  validators: 0,
  epoch: 0,
  slot: 0,
  slotIndex: 0,
  slotsPerEpoch: 432000,
  currentTf: '1D',
  chartCache: {},
  slippage: 0.005,
  wizardStep: 0
}

// ── INIT ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  mountToast()
  initModals()
  initWalletModal({
    onConnect: onWalletConnect,
    onDisconnect: onWalletDisconnect
  })

  // expose globals for inline event handlers
  Object.assign(window, {
    openWalletModal, openModal, closeModal, showToast,
    navTo, pickTf, execSwap, calcSwap,
    setTradeMode, saveRpc, setSlippage,
    wizGo, updateStake
  })

  await refreshNetwork()
  loadChart(state.currentTf)

  setInterval(refreshNetwork, 30_000)
  setInterval(async () => {
    const s = getSession()
    if (s) {
      await s.refreshBalance()
      updateWalletUI(s)
    }
  }, 30_000)
  setInterval(async () => {
    const s = getSession()
    if (s) await loadTransactions(s)
  }, 60_000)
})

// ── NETWORK DATA ─────────────────────────────────────────
async function refreshNetwork() {
  const [{ tps, validators, epoch, slot, slotIndex, slotsPerEpoch }, { price, change24h }] = await Promise.all([
    getNetworkStats(),
    getSolPrice()
  ])
  Object.assign(state, { tps, validators, epoch, slot, slotIndex, slotsPerEpoch, solPrice: price, solChange24h: change24h })
  applyNetworkToDOM()
  calcSwap()
}

function applyNetworkToDOM() {
  const { solPrice: p, solChange24h: ch, tps, validators, epoch, slot, slotIndex, slotsPerEpoch } = state
  const { label: epochEta } = epochTimeRemaining(slotIndex, slotsPerEpoch)
  const sign = ch >= 0 ? '+' : ''
  const changeClass = ch >= 0 ? 'text-lime' : 'text-danger'

  // Topbar
  setText('tb-price', formatUsd(p))
  setText('tb-tps', tps > 0 ? formatCompact(tps) : '…')
  setText('tb-epoch', '#' + epoch)
  setText('tb-validators', validators > 0 ? formatCompact(validators) : '…')

  // Dashboard stat cards
  setText('d-price', formatUsd(p))
  setHtml('d-price-change', `<span class="${changeClass}">${sign}${ch.toFixed(2)}% 24h</span>`)
  setText('d-tps', tps > 0 ? tps.toLocaleString() : '…')
  setText('d-epoch', 'Epoch #' + epoch)
  setText('d-validators', validators > 0 ? validators.toLocaleString() : '…')
  setText('d-slot', 'Slot ' + (slot > 0 ? (slot / 1e6).toFixed(1) + 'M' : '…'))

  // Chart header
  setText('chart-price', formatUsd(p))
  setHtml('chart-change', `<span class="${changeClass}">${sign}${ch.toFixed(2)}% · ${sign}${formatUsd(Math.abs(p * ch / 100), 3)}</span>`)

  // Stake page
  setText('stake-epoch-eta', epochEta)
  setText('stake-epoch-num', '#' + epoch)
  setText('stake-validators', validators > 0 ? validators.toLocaleString() : '…')
}

// ── WALLET ───────────────────────────────────────────────
async function onWalletConnect(session) {
  updateWalletUI(session)
  await loadTransactions(session)
}

function onWalletDisconnect() {
  const btn = document.getElementById('wallet-top-btn')
  if (btn) { btn.textContent = 'Connect Wallet'; btn.classList.remove('connected') }
  setText('d-bal', '—')
  setText('d-bal-usd', 'Connect wallet')
  const feed = document.getElementById('tx-feed')
  if (feed) feed.innerHTML = '<div class="empty-state">Connect your wallet to see transaction history.</div>'
  calcSwap()
}

function updateWalletUI(session) {
  const btn = document.getElementById('wallet-top-btn')
  if (btn) { btn.textContent = session.shortAddress; btn.classList.add('connected') }
  const balEl = document.getElementById('d-bal')
  if (balEl) setHtml('d-bal', `<span class="text-lime">${session.solBalance.toFixed(4)}</span>`)
  setText('d-bal-usd', '≈ ' + formatUsd(session.solBalance * state.solPrice))
  calcSwap()
}

async function loadTransactions(session) {
  const feed = document.getElementById('tx-feed')
  if (!feed) return
  feed.innerHTML = '<div class="empty-state">Loading…</div>'
  try {
    const txs = await session.getTransactions(10)
    if (!txs.length) { feed.innerHTML = '<div class="empty-state">No transactions found.</div>'; return }
    feed.innerHTML = txs.map(tx => `
      <div class="tx-row" onclick="window.open('${tx.solscanUrl}','_blank','noopener,noreferrer')">
        <div class="tx-icon ${tx.err ? 'ic-red' : tx.isIncoming ? 'ic-green' : 'ic-blue'}">${tx.err ? '✕' : tx.isIncoming ? '⬇' : '⬆'}</div>
        <div class="tx-desc">
          <div class="tx-label">${tx.label}</div>
          <div class="tx-meta">${tx.timeAgo} · ${tx.shortSignature}</div>
        </div>
        <div class="tx-amt ${tx.isIncoming ? 'pos' : tx.isOutgoing ? 'neg' : ''}">${formatDelta(tx.delta)}</div>
      </div>`).join('')
  } catch (err) {
    feed.innerHTML = '<div class="empty-state">Failed to load transactions.</div>'
  }
}

// ── PRICE CHART ──────────────────────────────────────────
async function loadChart(tf) {
  state.currentTf = tf
  if (!state.chartCache[tf]) {
    state.chartCache[tf] = await getPriceChart(tf)
  }
  const canvas = document.getElementById('price-chart')
  if (canvas) renderPriceChart(canvas, state.chartCache[tf])
}

function pickTf(btn, tf) {
  document.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('active'))
  btn.classList.add('active')
  loadChart(tf)
}

// ── SWAP ─────────────────────────────────────────────────
async function calcSwap() {
  const solEl = document.getElementById('sol-input')
  const sol = parseFloat(solEl?.value) || 0
  const quote = await getSwapQuote(sol)

  setText('sol-usd', '≈ ' + formatUsd(sol * state.solPrice))
  const synEl = document.getElementById('syn-output')
  if (synEl) synEl.value = quote.outputAmount.toFixed(2)
  setText('syn-usd', '≈ ' + formatUsd(quote.outputAmount * 0.84))
  setText('swap-rate', `1 SOL = ${quote.rate?.toFixed(2) ?? SOL_TO_SYN} SYN`)
  setText('swap-min', (quote.outputAmount * (1 - state.slippage)).toFixed(2) + ' SYN')

  const btn = document.getElementById('exec-swap-btn')
  if (btn) btn.textContent = getSession()?.connected ? 'Swap SOL → SYN' : 'Connect wallet to swap'
}

async function execSwap() {
  const session = getSession()
  if (!session?.connected) { openWalletModal(); return }
  const sol = parseFloat(document.getElementById('sol-input').value) || 0
  if (sol <= 0) { showToast('error', 'Invalid amount', 'Enter a SOL amount'); return }
  if (sol > session.solBalance) { showToast('error', 'Insufficient SOL', `Balance: ${formatSol(session.solBalance)}`); return }
  openJupiterSwap(sol)
  showToast('success', 'Opened Jupiter', 'Complete your swap in the new tab')
}

function setTradeMode(mode, btn) {
  document.querySelectorAll('.trade-tab').forEach(b => b.classList.remove('active'))
  btn.classList.add('active')
}

// ── NAVIGATION ───────────────────────────────────────────
function navTo(name, el) {
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'))
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'))
  const navEl = el ?? document.querySelector(`[data-tab="${name}"]`)
  navEl?.classList.add('active')
  document.getElementById('page-' + name)?.classList.add('active')
  if (name === 'trade') setTimeout(() => loadChart(state.currentTf), 50)
}

// ── NODE WIZARD ──────────────────────────────────────────
function wizGo(n) {
  const prev = state.wizardStep
  if (n === 3) {
    exitWizardStep(prev)
    state.wizardStep = 3
    enterWizardStep(3)
    runLaunchSequence()
    return
  }
  exitWizardStep(prev)
  if (n > prev) document.getElementById(`ws${prev}`)?.classList.add('done')
  state.wizardStep = n
  enterWizardStep(n)
}

function exitWizardStep(n) {
  document.getElementById(`ws${n}`)?.classList.remove('active')
  document.getElementById(`wp${n}`)?.classList.remove('active')
}
function enterWizardStep(n) {
  document.getElementById(`ws${n}`)?.classList.add('active')
  document.getElementById(`wp${n}`)?.classList.add('active')
}

function updateStake() {
  const v = parseInt(document.getElementById('stake-slider').value)
  setText('stake-display', v.toLocaleString() + ' SYN')
  setText('stake-usd', '≈ ' + formatUsd(v * 0.84))
  setText('stake-tier', v < 5000 ? 'Standard' : v < 20000 ? 'Priority' : 'Elite')
  setText('stake-earn', v < 5000 ? '~80–140 SYN' : v < 20000 ? '~150–220 SYN' : '~240–360 SYN')
}

const LAUNCH_LOG = [
  'Connecting to Solana RPC…',
  'Validating stake transaction…',
  'Submitting registration tx…',
  'Awaiting on-chain confirmation…',
  'Configuring inference runtime…',
  'Pulling model weights…',
  'Running health check…',
  'Node online ✓'
]

function runLaunchSequence() {
  const log = document.getElementById('launch-log')
  if (!log) return
  log.innerHTML = ''
  let i = 0
  const iv = setInterval(() => {
    if (i < LAUNCH_LOG.length) {
      const d = document.createElement('div')
      d.style.color = LAUNCH_LOG[i].includes('✓') ? 'var(--lime)' : 'var(--muted2)'
      d.textContent = '> ' + LAUNCH_LOG[i]
      log.appendChild(d)
      log.scrollTop = log.scrollHeight
      i++
    } else {
      clearInterval(iv)
      setTimeout(() => {
        document.getElementById('launch-anim')?.style.setProperty('display', 'none')
        document.getElementById('launch-done')?.style.removeProperty('display')
        showToast('success', 'Node is live!', 'Now receiving inference requests')
      }, 500)
    }
  }, 600)
}

// ── SETTINGS ─────────────────────────────────────────────
function saveRpc() {
  const { setRpcUrl } = import('./api/rpc.js')
  const v = document.getElementById('rpc-input')?.value?.trim()
  if (!v) return
  import('./api/rpc.js').then(m => {
    m.setRpcUrl(v)
    showToast('success', 'RPC updated', v.length > 30 ? v.slice(0, 30) + '…' : v)
    refreshNetwork()
  })
}

function setSlippage(val) {
  state.slippage = val / 100
  showToast('info', 'Slippage set', val + '%')
  calcSwap()
}

// ── DOM HELPERS ───────────────────────────────────────────
function setText(id, val) {
  const el = document.getElementById(id)
  if (el) el.textContent = val
}
function setHtml(id, val) {
  const el = document.getElementById(id)
  if (el) el.innerHTML = val
}
