# Synapse App

**The Synapse Protocol utility app.** Trade, stake, and monitor the network — all in your browser with your real Solana wallet.

🌐 **Live:** [YOUR-USERNAME.github.io/synapse-app](https://YOUR-USERNAME.github.io/synapse-app)
🏠 **Marketing site:** [YOUR-USERNAME.github.io/synapse](https://YOUR-USERNAME.github.io/synapse)

## Features

- **Wallet connect** — Phantom, Solflare, Backpack (real browser wallet APIs)
- **Live SOL balance** — fetched from Solana mainnet RPC on connect
- **Live price chart** — 1H / 1D / 1W / 1M from CoinGecko
- **Transaction history** — real txs from your connected wallet, clickable to Solscan
- **Network stats** — live TPS, validator count, epoch, slot height
- **Trade** — SOL → SYN swap routed through Jupiter
- **Stake** — staking interface (live when $SYN hits mainnet)
- **Node registration wizard** — step-by-step flow
- **Settings** — configurable RPC endpoint, slippage tolerance

## Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Synapse App"
git remote add origin https://github.com/YOUR-USERNAME/synapse-app.git
git push -u origin main
```

Then: **Settings → Pages → Source: main / (root) → Save**

Live at: `https://YOUR-USERNAME.github.io/synapse-app`

## Tech

Single-file HTML app. No build step, no framework, no dependencies.
- Solana mainnet RPC for on-chain data
- CoinGecko API for price data
- Native browser wallet adapters (no `@solana/wallet-adapter` needed)
