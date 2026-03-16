/* ── SYNAPSE PROTOCOL — APP STYLES ──────────────────────── */

:root {
  --bg:      #050507;
  --bg1:     #0a0a0f;
  --bg2:     #0f0f16;
  --lime:    #c2f751;
  --white:   #f0ede6;
  --muted:   #52525f;
  --muted2:  #7a7a8a;
  --danger:  #f87171;
  --warn:    #f59e0b;
  --border:  rgba(255,255,255,.06);
  --border2: rgba(255,255,255,.12);
  --radius:  12px;
  --radius-lg: 16px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { height: 100%; overflow: hidden; }
body {
  background: var(--bg);
  color: var(--white);
  font-family: 'DM Sans', sans-serif;
  display: flex;
  flex-direction: column;
  -webkit-font-smoothing: antialiased;
}
::-webkit-scrollbar { width: 3px; height: 3px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--muted); border-radius: 2px; }

/* ── TYPOGRAPHY UTILITIES ── */
.mono       { font-family: 'JetBrains Mono', monospace; }
.small      { font-size: 11px; }
.tiny       { font-size: 10px; }
.text-lime  { color: var(--lime); }
.text-warn  { color: var(--warn); }
.text-danger{ color: var(--danger); }
.text-muted { color: var(--muted2); }

/* ── TOP BAR ── */
.topbar {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  background: var(--bg1);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  gap: 1rem;
}
.topbar-left  { display: flex; align-items: center; gap: .75rem; min-width: 0; }
.topbar-right { display: flex; align-items: center; gap: .75rem; flex-shrink: 0; }

.logo { display: flex; align-items: center; gap: 9px; text-decoration: none; }
.logo-mark {
  width: 28px; height: 28px;
  border: 1px solid rgba(194,247,81,.3);
  border-radius: 7px;
  display: flex; align-items: center; justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; font-weight: 500; color: var(--lime);
}
.logo-name {
  font-family: 'Cormorant', serif;
  font-size: 17px; font-weight: 600;
  color: var(--white); letter-spacing: .08em; text-transform: uppercase;
}
.topbar-divider { width: 1px; height: 22px; background: var(--border2); flex-shrink: 0; }

.network-badge {
  display: flex; align-items: center; gap: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; color: var(--muted2); letter-spacing: .08em;
  flex-shrink: 0;
}
.net-dot {
  width: 6px; height: 6px;
  background: var(--lime); border-radius: 50%;
  box-shadow: 0 0 6px var(--lime);
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }

.topbar-stats {
  display: flex; gap: 1.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; color: var(--muted); letter-spacing: .06em;
  overflow: hidden;
}
.topbar-stats strong { color: var(--white); }

/* ── WALLET BUTTON ── */
.btn-wallet {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px; font-weight: 500;
  padding: 8px 16px;
  border-radius: 100px;
  border: 1px solid var(--border2);
  background: none; color: var(--muted2);
  cursor: pointer; transition: all .2s; letter-spacing: .06em;
}
.btn-wallet:hover { color: var(--white); border-color: rgba(255,255,255,.2); }
.btn-wallet.connected { color: var(--lime); border-color: rgba(194,247,81,.25); background: rgba(194,247,81,.05); }

/* ── APP SHELL ── */
.app-shell { display: flex; flex: 1; overflow: hidden; }

/* ── SIDEBAR ── */
.sidebar {
  width: 192px; flex-shrink: 0;
  background: var(--bg1);
  border-right: 1px solid var(--border);
  display: flex; flex-direction: column;
  overflow-y: auto; padding: .5rem 0;
}
.nav-section {
  padding: .75rem .75rem .3rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px; letter-spacing: .16em; color: var(--muted);
  text-transform: uppercase;
}
.nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: .6rem 1rem;
  font-size: 13px; color: var(--muted2);
  cursor: pointer; transition: all .2s;
  border-radius: 8px; margin: .1rem .5rem;
  border: 1px solid transparent;
}
.nav-item:hover { color: var(--white); background: rgba(255,255,255,.03); }
.nav-item.active {
  color: var(--lime); background: rgba(194,247,81,.06);
  border-color: rgba(194,247,81,.1);
}
.nav-icon { font-size: 14px; width: 18px; text-align: center; flex-shrink: 0; }
.sidebar-footer { margin-top: auto; padding: .75rem; border-top: 1px solid var(--border); }
.sidebar-link {
  display: flex; align-items: center; gap: 8px;
  padding: .45rem .75rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; color: var(--muted); letter-spacing: .08em;
  text-decoration: none; border-radius: 6px; transition: color .2s;
}
.sidebar-link:hover { color: var(--white); }

/* ── MAIN CONTENT ── */
.main-content {
  flex: 1; overflow-y: auto; min-width: 0;
  display: flex; flex-direction: column;
}
.page {
  display: none; padding: 2rem; flex-direction: column; gap: 1.5rem;
  flex: 1; min-height: 0;
}
.page.active { display: flex; }
.page-title {
  font-family: 'Cormorant', serif;
  font-size: 28px; font-weight: 300; letter-spacing: -.01em;
  flex-shrink: 0;
}
.page-header { display: flex; align-items: center; justify-content: space-between; }

/* ── CARDS & PANELS ── */
.card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg); padding: 1.5rem;
}
.panel {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg); overflow: hidden;
}
.panel-head {
  padding: .85rem 1.25rem;
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
}
.panel-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; letter-spacing: .14em; color: var(--muted); text-transform: uppercase;
}
.panel-action {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; color: var(--lime);
  background: none; border: none; cursor: pointer; letter-spacing: .06em;
}

/* ── STAT CARDS ── */
.stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.stat-card {
  background: var(--bg2); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 1.1rem 1.25rem;
  transition: border-color .2s;
}
.stat-card:hover { border-color: rgba(194,247,81,.12); }
.sc-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px; letter-spacing: .14em; color: var(--muted);
  text-transform: uppercase; margin-bottom: 6px;
}
.sc-val {
  font-family: 'Cormorant', serif;
  font-size: 30px; font-weight: 300; letter-spacing: -.02em; line-height: 1;
}
.sc-sub { font-size: 11px; color: var(--muted2); margin-top: 4px; }

/* ── TRANSACTION FEED ── */
.tx-row {
  display: flex; align-items: center; gap: .85rem;
  padding: .8rem 1.25rem;
  border-bottom: 1px solid var(--border);
  font-size: 13px; cursor: pointer; transition: background .15s;
}
.tx-row:last-child { border-bottom: none; }
.tx-row:hover { background: rgba(255,255,255,.02); }
.tx-icon {
  width: 30px; height: 30px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; flex-shrink: 0;
}
.ic-green { background: rgba(194,247,81,.1); }
.ic-blue  { background: rgba(96,165,250,.1); }
.ic-red   { background: rgba(248,113,113,.1); }
.tx-desc  { flex: 1; min-width: 0; }
.tx-label { font-weight: 500; }
.tx-meta  { font-size: 10px; color: var(--muted2); margin-top: 2px; font-family: 'JetBrains Mono', monospace; }
.tx-amt   { font-family: 'JetBrains Mono', monospace; font-size: 12px; flex-shrink: 0; }
.tx-amt.pos { color: var(--lime); }
.tx-amt.neg { color: var(--danger); }
.empty-state { padding: 2.5rem; text-align: center; color: var(--muted2); font-size: 13px; line-height: 1.7; }

/* ── TRADE / SWAP ── */
.trade-layout { display: grid; grid-template-columns: 360px 1fr; gap: 1.5rem; align-items: start; }
.swap-card { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.5rem; }
.trade-tabs { display: flex; background: var(--bg1); border-radius: 10px; padding: 3px; margin-bottom: 1.25rem; }
.trade-tab {
  flex: 1; padding: .55rem; text-align: center;
  font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: .06em;
  color: var(--muted2); background: none; border: none; border-radius: 8px; cursor: pointer; transition: all .2s;
}
.trade-tab.active { background: var(--lime); color: var(--bg); }
.swap-box {
  background: var(--bg1); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 1rem 1.25rem; margin-bottom: 6px;
}
.swap-lbl {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px; letter-spacing: .14em; color: var(--muted); text-transform: uppercase; margin-bottom: .5rem;
}
.swap-row { display: flex; align-items: center; gap: .75rem; }
.swap-amount {
  flex: 1; min-width: 0; background: none; border: none;
  font-family: 'Cormorant', serif; font-size: 32px; font-weight: 300;
  color: var(--white); outline: none;
}
.swap-token {
  display: flex; align-items: center; gap: 6px;
  background: var(--bg2); border: 1px solid var(--border2);
  padding: 7px 12px; border-radius: 100px; font-size: 13px; font-weight: 500;
  white-space: nowrap; flex-shrink: 0;
}
.swap-hint {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; color: var(--muted); margin-top: 4px;
}
.swap-divider { display: flex; justify-content: center; padding: .3rem 0; }
.btn-flip {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--bg2); border: 1px solid var(--border2);
  color: var(--muted2); font-size: 14px; cursor: pointer;
  display: flex; align-items: center; justify-content: center; transition: all .2s;
}
.btn-flip:hover { border-color: rgba(194,247,81,.3); color: var(--lime); transform: rotate(180deg); }
.swap-details { border-top: 1px solid var(--border); padding-top: .9rem; margin-top: .9rem; display: flex; flex-direction: column; gap: .4rem; }
.swap-detail { display: flex; justify-content: space-between; font-size: 12px; color: var(--muted2); }
.swap-detail span:last-child { color: var(--white); font-family: 'JetBrains Mono', monospace; }

.chart-card { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.5rem; }
.chart-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem; }
.chart-price { font-family: 'Cormorant', serif; font-size: 40px; font-weight: 300; letter-spacing: -.02em; line-height: 1; }
.chart-change { font-family: 'JetBrains Mono', monospace; font-size: 11px; margin-top: 3px; }
.tf-row { display: flex; gap: 4px; }
.tf-btn {
  font-family: 'JetBrains Mono', monospace; font-size: 10px; padding: 4px 10px;
  border-radius: 6px; border: 1px solid var(--border); background: none; color: var(--muted);
  cursor: pointer; transition: all .2s; letter-spacing: .08em;
}
.tf-btn.active { background: rgba(194,247,81,.1); color: var(--lime); border-color: rgba(194,247,81,.2); }

/* ── STAKE ── */
.stake-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.big-num {
  font-family: 'Cormorant', serif; font-size: 48px; font-weight: 300;
  letter-spacing: -.03em; line-height: 1; margin: .5rem 0 .25rem;
  color: var(--lime);
}
.big-num .big-unit { font-size: 22px; color: var(--muted2); }
.apy-pill {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--lime);
  background: rgba(194,247,81,.08); border: 1px solid rgba(194,247,81,.15);
  padding: 5px 12px; border-radius: 100px; margin-top: .75rem;
}
.apy-dot { width: 5px; height: 5px; background: var(--lime); border-radius: 50%; animation: pulse 2s infinite; }
.action-row { display: flex; gap: 8px; margin-top: 1.25rem; }
.btn-action {
  flex: 1; padding: 11px; border-radius: 10px;
  font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: .06em;
  cursor: pointer; transition: all .2s; border: 1px solid var(--border);
}
.btn-action.primary  { background: var(--lime); color: var(--bg); border-color: var(--lime); }
.btn-action.primary:hover { background: #d8ff6a; }
.btn-action.secondary { background: none; color: var(--muted2); }
.btn-action.secondary:hover { color: var(--white); border-color: rgba(255,255,255,.2); }
.info-list { border-top: 1px solid var(--border); }
.info-row {
  display: flex; justify-content: space-between;
  padding: .65rem 0; border-bottom: 1px solid var(--border); font-size: 13px;
}
.info-row span:first-child { color: var(--muted2); }
.info-row span:last-child { font-family: 'JetBrains Mono', monospace; }

/* ── NODES ── */
.nodes-table { background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
.nt-head, .nt-row {
  display: grid;
  grid-template-columns: 1.4fr .6fr .6fr .7fr 1fr .8fr;
  gap: .5rem; padding: .75rem 1.25rem; align-items: center;
}
.nt-head {
  font-family: 'JetBrains Mono', monospace; font-size: 9px;
  letter-spacing: .12em; color: var(--muted); text-transform: uppercase;
  border-bottom: 1px solid var(--border);
}
.nt-row { border-bottom: 1px solid var(--border); transition: background .15s; font-size: 12px; }
.nt-row:last-child { border-bottom: none; }
.nt-row:hover { background: rgba(255,255,255,.02); }
.node-name { font-weight: 500; font-size: 13px; }
.node-loc { font-size: 10px; color: var(--muted2); margin-top: 1px; font-family: 'JetBrains Mono', monospace; }
.st-dot { width: 7px; height: 7px; border-radius: 50%; display: inline-block; margin-right: 4px; }
.st-dot.online { background: var(--lime); box-shadow: 0 0 5px var(--lime); }
.st-dot.busy   { background: var(--warn); box-shadow: 0 0 5px var(--warn); }
.rep-bar { height: 3px; background: rgba(255,255,255,.06); border-radius: 2px; overflow: hidden; margin-top: 3px; }
.rep-fill { height: 100%; background: var(--lime); border-radius: 2px; }

/* ── SETTINGS ── */
.settings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.slippage-row { display: flex; gap: 6px; margin-top: .75rem; }
.btn-slip {
  font-family: 'JetBrains Mono', monospace; font-size: 10px; padding: 7px 14px;
  background: rgba(194,247,81,.06); border: 1px solid rgba(194,247,81,.15);
  border-radius: 100px; color: var(--muted2); cursor: pointer; transition: all .2s;
}
.btn-slip.active, .btn-slip:hover { background: rgba(194,247,81,.16); color: var(--lime); border-color: rgba(194,247,81,.35); }

/* ── BUTTONS ── */
.btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 500;
  color: var(--bg); background: var(--lime); border: none;
  padding: 11px 22px; border-radius: 100px; cursor: pointer;
  letter-spacing: .06em; transition: all .2s;
}
.btn-primary:hover { background: #d8ff6a; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(194,247,81,.25); }
.btn-secondary {
  font-family: 'JetBrains Mono', monospace; font-size: 11px;
  color: var(--muted2); background: none; border: 1px solid var(--border2);
  padding: 8px 16px; border-radius: 100px; cursor: pointer;
  letter-spacing: .06em; transition: all .2s;
}
.btn-secondary:hover { color: var(--white); border-color: rgba(255,255,255,.2); }
.btn-swap {
  width: 100%; padding: 14px; background: var(--lime); border: none;
  border-radius: 100px; font-family: 'JetBrains Mono', monospace;
  font-size: 12px; font-weight: 500; color: var(--bg);
  letter-spacing: .06em; cursor: pointer; transition: all .2s; margin-top: 1rem;
}
.btn-swap:hover { background: #d8ff6a; box-shadow: 0 4px 24px rgba(194,247,81,.25); }
.btn-swap:disabled { opacity: .4; cursor: not-allowed; }

/* ── FORM ELEMENTS ── */
.text-input {
  width: 100%; background: var(--bg1); border: 1px solid var(--border);
  border-radius: 8px; padding: 10px 12px; color: var(--white);
  font-family: 'DM Sans', sans-serif; font-size: 13px; outline: none;
  transition: border-color .2s;
}
.text-input:focus { border-color: rgba(194,247,81,.3); }
.select-input {
  width: 100%; background: var(--bg1); border: 1px solid var(--border);
  border-radius: 8px; padding: 10px 12px; color: var(--white);
  font-size: 13px; outline: none; appearance: none;
}
.range-input { width: 100%; accent-color: var(--lime); margin: .5rem 0; }
.field-label {
  display: block; font-family: 'JetBrains Mono', monospace;
  font-size: 9px; letter-spacing: .14em; color: var(--muted);
  text-transform: uppercase; margin: .9rem 0 .35rem;
}

/* ── MODALS ── */
.overlay {
  position: fixed; inset: 0; z-index: 1000;
  display: none; align-items: center; justify-content: center;
  background: rgba(5,5,7,.85); backdrop-filter: blur(12px);
}
.overlay.open { display: flex; }
.modal {
  background: var(--bg1); border: 1px solid var(--border2);
  border-radius: 20px; position: relative;
  max-height: 90vh; overflow-y: auto;
  width: 90%; max-width: 460px;
  animation: modalIn .25s ease both;
}
.modal-wide { max-width: 520px; }
@keyframes modalIn { from{opacity:0;transform:translateY(12px) scale(.98)} to{opacity:1;transform:none} }
.modal-close {
  position: absolute; top: 1rem; right: 1rem;
  width: 30px; height: 30px; border-radius: 50%;
  background: none; border: 1px solid var(--border2);
  color: var(--muted2); font-size: 15px; cursor: pointer;
  display: flex; align-items: center; justify-content: center; transition: all .2s;
}
.modal-close:hover { color: var(--white); border-color: rgba(255,255,255,.2); }
.modal-head { padding: 1.75rem 1.75rem 1.1rem; }
.modal-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px; letter-spacing: .2em; color: var(--lime);
  text-transform: uppercase; margin-bottom: .5rem;
}
.modal-title { font-family: 'Cormorant', serif; font-size: 28px; font-weight: 300; letter-spacing: -.02em; }
.modal-title em { font-style: italic; color: var(--lime); }
.modal-body { padding: 0 1.75rem 1.75rem; }
.modal-desc { font-size: 13px; color: var(--muted2); margin-bottom: 1rem; line-height: 1.7; }

/* ── WALLET MODAL SPECIFIC ── */
.wallet-list { display: flex; flex-direction: column; gap: 7px; }
.wallet-btn {
  display: flex; align-items: center; gap: .9rem;
  width: 100%; padding: .9rem 1.1rem;
  background: var(--bg2); border: 1px solid var(--border);
  border-radius: var(--radius); color: var(--white);
  font-size: 14px; cursor: pointer; transition: all .2s; text-align: left;
}
.wallet-btn:hover { background: rgba(194,247,81,.03); border-color: rgba(194,247,81,.18); }
.wallet-icon { width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
.wallet-name { font-weight: 500; }
.wallet-desc { font-size: 11px; color: var(--muted2); margin-top: 1px; }
.wallet-arrow { margin-left: auto; color: var(--muted); font-size: 13px; }
.badge-not-installed {
  font-size: 9px; font-family: 'JetBrains Mono', monospace;
  color: var(--muted); background: rgba(255,255,255,.05);
  padding: 1px 6px; border-radius: 100px; margin-left: 6px; letter-spacing: .08em;
}
.wallet-connecting { text-align: center; padding: 2rem; color: var(--muted2); font-size: 13px; }
.wallet-address {
  font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--lime);
  background: rgba(194,247,81,.06); border: 1px solid rgba(194,247,81,.15);
  padding: 9px 16px; border-radius: 100px; display: inline-block; margin: .75rem 0; cursor: pointer;
}
.copy-hint { font-size: 10px; opacity: .5; }
.balance-list { margin-top: .25rem; }
.balance-row { display: flex; justify-content: space-between; padding: .65rem 0; border-bottom: 1px solid var(--border); font-size: 13px; }
.balance-row:last-child { border-bottom: none; }
.balance-row span:first-child { color: var(--muted2); }
.balance-row span:last-child { font-family: 'JetBrains Mono', monospace; }
.solscan-link {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--lime);
  border: 1px solid rgba(194,247,81,.2); padding: 6px 14px;
  border-radius: 100px; text-decoration: none; margin-top: 1rem;
  letter-spacing: .1em; transition: all .2s;
}
.solscan-link:hover { background: rgba(194,247,81,.06); }
.btn-disconnect {
  margin-top: 1rem; width: 100%; padding: 11px;
  background: rgba(248,113,113,.06); border: 1px solid rgba(248,113,113,.15);
  border-radius: 10px; color: var(--danger);
  font-family: 'JetBrains Mono', monospace; font-size: 11px;
  cursor: pointer; letter-spacing: .1em; transition: all .2s;
}
.btn-disconnect:hover { background: rgba(248,113,113,.12); }

/* ── WIZARD ── */
.wiz-steps { display: flex; border: 1px solid var(--border); border-radius: 10px; overflow: hidden; margin-bottom: 1.5rem; }
.ws {
  flex: 1; padding: .65rem; text-align: center;
  font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .08em;
  color: var(--muted); border-right: 1px solid var(--border); transition: all .3s;
}
.ws:last-child { border-right: none; }
.ws.active { color: var(--lime); background: rgba(194,247,81,.06); }
.ws.done   { color: var(--lime); opacity: .5; }
.wp { display: none; }
.wp.active { display: block; }
.req-list { display: flex; flex-direction: column; }
.req-item { display: flex; align-items: center; gap: .65rem; padding: .75rem 0; border-bottom: 1px solid var(--border); font-size: 13px; }
.req-item:last-child { border-bottom: none; }
.req-ic { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; flex-shrink: 0; }
.req-ic.ok   { background: rgba(194,247,81,.12); color: var(--lime); }
.req-ic.warn { background: rgba(245,158,11,.12); color: var(--warn); }
.req-label { flex: 1; }
.req-val { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--muted2); }
.req-val.warn { color: var(--warn); }
.stake-big { font-family: 'Cormorant', serif; font-size: 44px; font-weight: 300; color: var(--lime); text-align: center; letter-spacing: -.03em; }
.stake-usd-hint { text-align: center; font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--muted); }
.tier-box { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 1rem; margin-top: 1rem; }
.tier-row { display: flex; justify-content: space-between; padding: .4rem 0; border-bottom: 1px solid var(--border); font-size: 13px; }
.tier-row:last-child { border-bottom: none; }
.tier-row span:first-child { color: var(--muted2); }
.wiz-btns { display: flex; gap: 8px; margin-top: 1.5rem; }
.btn-wiz-back {
  padding: 11px 20px; background: none; border: 1px solid var(--border2);
  border-radius: 100px; color: var(--muted2);
  font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .06em; cursor: pointer;
}
.btn-wiz-next {
  flex: 1; padding: 12px; background: var(--lime); border: none;
  border-radius: 100px; color: var(--bg);
  font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: .06em; cursor: pointer;
  transition: background .2s;
}
.btn-wiz-next:hover { background: #d8ff6a; }
.launch-title { font-family: 'Cormorant', serif; font-size: 24px; font-weight: 300; margin-bottom: .35rem; }
.launch-log {
  background: var(--bg2); border: 1px solid var(--border); border-radius: 8px;
  padding: .9rem; font-family: 'JetBrains Mono', monospace;
  font-size: 11px; color: var(--muted2); line-height: 2;
  max-height: 130px; overflow-y: auto; margin-top: 1rem; text-align: left;
}

/* ── TOAST ── */
.toast {
  position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 5000;
  background: var(--bg1); border: 1px solid rgba(194,247,81,.2);
  border-radius: var(--radius); padding: .9rem 1.1rem;
  display: flex; align-items: center; gap: .65rem;
  font-size: 13px; max-width: 300px;
  transform: translateY(120%); transition: transform .3s ease;
  box-shadow: 0 8px 30px rgba(0,0,0,.5);
}
.toast.show { transform: translateY(0); }
.toast-icon { font-size: 16px; flex-shrink: 0; }
.toast-title { font-weight: 500; margin-bottom: 1px; }
.toast-sub { font-size: 11px; color: var(--muted2); font-family: 'JetBrains Mono', monospace; word-break: break-all; }

/* ── SPINNER ── */
.spinner {
  width: 44px; height: 44px;
  border: 2px solid var(--border2);
  border-top-color: var(--lime);
  border-radius: 50%;
  animation: spin .7s linear infinite;
  margin: 0 auto 1rem;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .stat-grid { grid-template-columns: repeat(2, 1fr); }
  .trade-layout { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .sidebar { width: 52px; }
  .nav-section, .nav-item span:not(.nav-icon), .sidebar-footer span:not(.nav-icon) { display: none; }
  .topbar-stats { display: none; }
  .stake-grid { grid-template-columns: 1fr; }
  .settings-grid { grid-template-columns: 1fr; }
  .nt-head, .nt-row { grid-template-columns: 1fr .6fr .6fr; }
  .nt-head span:nth-child(n+4), .nt-row > *:nth-child(n+4) { display: none; }
}
@media (max-width: 480px) {
  .stat-grid { grid-template-columns: 1fr; }
  .page { padding: 1rem; }
}
