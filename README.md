# Synapse Protocol

Decentralized AI inference marketplace on Solana. This is the **app utility** — a browser-based dashboard for interacting with the Synapse Protocol network.

🌐 **Marketing site:** [synapse-protocol.io](https://beastusz.github.io/synapse) &nbsp;|&nbsp; **This repo:** the runnable utility app

## Features

| Feature | Status | Source |
|---|---|---|
| Wallet connect (Phantom, Solflare, Backpack) | ✅ Live | `src/api/wallet.js` |
| SOL balance (real on-chain) | ✅ Live | `src/api/rpc.js` |
| SOL price + 24h change | ✅ Live | `src/api/price.js` (CoinGecko) |
| Price chart (1H / 1D / 1W / 1M) | ✅ Live | `src/api/price.js` |
| Network TPS | ✅ Live | `src/api/rpc.js` |
| Validator count | ✅ Live | `src/api/rpc.js` |
| Epoch + slot height | ✅ Live | `src/api/rpc.js` |
| Transaction history | ✅ Live | `src/api/rpc.js` |
| Swap SOL → SYN | ✅ Live (via Jupiter) | `src/api/jupiter.js` |
| $SYN balance / staking | ⏳ After mainnet launch | — |

## Getting started

```bash
git clone https://github.com/beastusz/synapse-protocol.git
cd synapse-protocol
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
# output in dist/
```

## Project structure

```
synapse-protocol/
├── index.html              # App shell (HTML only, no logic)
├── src/
│   ├── main.js             # Entry point — wires all modules together
│   ├── api/
│   │   ├── rpc.js          # Solana JSON-RPC client
│   │   ├── price.js        # CoinGecko price + chart data
│   │   ├── wallet.js       # Wallet adapters (Phantom/Solflare/Backpack)
│   │   └── jupiter.js      # Jupiter swap integration
│   ├── components/
│   │   ├── walletModal.js  # Wallet connect modal UI + session management
│   │   ├── modal.js        # Generic modal open/close
│   │   └── toast.js        # Toast notification system
│   ├── utils/
│   │   ├── chart.js        # Canvas price chart renderer
│   │   └── format.js       # Number, address, time formatting
│   └── styles/
│       └── app.css         # All styles
├── public/
│   └── favicon.svg
├── vite.config.js
└── package.json
```

## API modules

### `src/api/rpc.js`
Direct Solana JSON-RPC wrapper. Exports:
- `getBalance(pubkey)` → SOL balance
- `getEpochInfo()` → epoch, slot, slotsInEpoch
- `getNetworkTps()` → transactions per second
- `getValidatorCount()` → total validator count
- `getSignatures(pubkey, limit)` → recent tx signatures
- `getTransaction(signature)` → full tx data
- `getNetworkStats()` → all of the above in one call
- `setRpcUrl(url)` → switch RPC endpoint at runtime

### `src/api/price.js`
CoinGecko price feed. Exports:
- `getSolPrice()` → `{ price, change24h }`
- `getPriceChart(timeframe)` → `number[]` (1H/1D/1W/1M)

### `src/api/wallet.js`
Browser wallet adapters. Exports:
- `detectInstalledWallets()` → list with `installed` flag
- `connectWallet(walletId)` → `WalletSession`
- `WalletSession` class with `.getTransactions()`, `.signMessage()`, `.refreshBalance()`

### `src/api/jupiter.js`
Jupiter aggregator integration. Exports:
- `getSwapQuote(solAmount)` → quote object
- `openJupiterSwap(solAmount)` → opens Jupiter UI in new tab
- Update `SYN_MINT` with the real mint address after token launch to enable on-chain swaps

## Contributing

PRs welcome. Open an issue before submitting large changes.

## License

MIT
