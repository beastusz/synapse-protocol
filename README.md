# SYNAPSE Protocol

**Decentralized AI inference marketplace on Solana.**

$SYN is the utility token powering a permissionless network where anyone can run AI inference — or earn by providing GPU compute — settled instantly on Solana with sub-cent fees.

🌐 **Live site:** [synapse-protocol.github.io/app](https://synapse-protocol.github.io/app)

---

## What is Synapse?

Synapse solves three structural problems with centralized AI compute:

- **Monopoly pricing** — AWS, Azure, and Google mark up raw compute 5–20×
- **Censored models** — centralized APIs restrict models and outputs arbitrarily
- **No micropayments** — traditional rails can't settle per-token inference economically

Solana's sub-millisecond finality and near-zero fees make per-token micropayments viable for the first time.

---

## $SYN Token

| Property | Value |
|---|---|
| Total supply | 1,000,000,000 SYN (fixed) |
| New minting | Zero |
| Burn per inference | 15% of fee |
| Staking APY | 4–18% |
| Governance | 1 SYN = 1 vote (Solana Realms) |

**Allocation**
- 35% — Node operator rewards
- 20% — Ecosystem & grants
- 20% — Community sale
- 15% — Team & advisors (4yr vest, 1yr cliff)
- 10% — Treasury / DAO

---

## How it works

```
User request → Pay $SYN → Router assigns GPU node → Node earns 85% → 15% burned
```

1. **Submit** — Call the OpenAI-compatible API. No wallet required for developers.
2. **Settle** — Payment confirmed in <400ms on Solana for fractions of a cent.
3. **Route** — On-chain router picks the best node by reputation, latency, and model availability.
4. **Prove** — Node submits an optimistic proof. 85% fee released instantly. 15% burned.

---

## Protocol Architecture

Four on-chain Solana programs:

| Program | Role |
|---|---|
| **Router** | Matches inference requests to GPU nodes |
| **Registry** | Node registration, stake, and reputation scores |
| **Escrow** | Holds fees pending proof submission |
| **Verifier** | Validates optimistic proofs, handles slashing |

---

## Node Requirements

| Requirement | Spec |
|---|---|
| GPU | NVIDIA A100 / H100 / RTX 4090+ |
| VRAM | 24 GB minimum |
| Bandwidth | 1 Gbps+ uplink |
| OS | Ubuntu 22.04 / Docker |
| Uptime SLA | 95%+ (slashing risk below) |
| Min stake | 1,000 SYN |

**Routing tiers by stake:**
- Standard: 1,000–4,999 SYN → ~80–140 SYN/day
- Priority: 5,000–19,999 SYN → ~150–220 SYN/day
- Elite: 20,000+ SYN → ~240–360 SYN/day

---

## Developer SDK

Drop-in replacement for the OpenAI API:

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.synapse.so/v1",
    api_key="syn_your_api_key_here"  # pay in $SYN automatically
)

response = client.chat.completions.create(
    model="llama-3-70b",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

No web3 knowledge required. $SYN is acquired and managed transparently.

---

## Security

- **Fraud proofs** — 48h challenge window, inspired by Optimism's dispute game
- **Slashing** — incorrect results, downtime below 95% SLA, double-claiming
- **Sybil resistance** — 1,000 SYN minimum stake (~$840 at launch)
- **Audited** by OtterSec and Neodyme — reports in `/audits`

---

## Roadmap

| Phase | Timeline | Milestone |
|---|---|---|
| 1 | Q1 2025 | Testnet — 10 whitelisted nodes, Llama 3 + Mistral |
| 2 | Q2 2025 | Mainnet alpha — permissionless nodes, SDK, model registry |
| 3 | Q3 2025 | DAO launch — Realms governance, Wormhole bridge |
| 4 | Q4 2025 | Fine-tuning marketplace — royalties, ZK attestations |

---

## Backers

Multicoin Capital · Solana Ventures · Polychain Capital · Dragonfly Capital

---

## Links

- 🌐 Website: [synapse-protocol.github.io/app](https://synapse-protocol.github.io/app)
- 📄 Whitepaper: [/whitepaper.pdf](./whitepaper.pdf) *(coming soon)*
- 💬 Discord: [discord.gg/synapse](https://discord.gg/synapse)
- 🐦 Twitter: [@SynapseProtocol](https://twitter.com/SynapseProtocol)
- 🔍 Solscan: *(contract addresses after mainnet)*

---

## Deploying locally

```bash
git clone https://github.com/synapse-protocol/app
cd app
# Just open index.html — no build step required
open index.html
```

---

*© 2025 Synapse Protocol Foundation. MIT License.*
