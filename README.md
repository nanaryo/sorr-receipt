# 소르 영수증 / Sorr Receipt

Marinara personal extension 0.3.0. Adds a receipt and credit-balance tab immediately after Sorr Gallery, with on/off control through the normal external-extension list.

## Installation and use

Connect this repository in the GitHub extension manager, review and approve the extension, then enable it. Root `manifest.json` points to the ready-to-run `extension.js`; no build or dependency installation is needed.

The current owner already has this extension installed. Connect/update the existing extension instead of installing a duplicate. Keep `config.name` (소르 영수증) and runtime (`client`) stable for updates.

Open Home and select 소르 영수증 next to 소르 갤러리. The tab requires the existing Sorr Gallery native tab as its placement anchor. Add credit cards and configure the services you use. Existing Mallang settings and account credentials are not imported automatically.

Disable the external extension to remove its tab. The active receipt view, observers, timers and requests are cleaned up; its saved settings remain available for re-enabling. An already-open browser may need a refresh if the engine does not immediately unload a disabled extension.

## Scope

- Separate receipt and credit cards, adapted from the owner's installed disabled 말랑 API 영수증과 크레딧 0.1.0.
- Shadow DOM isolates the receipt view's styles from Mallang Home and other themes.
- No global font injection or global fetch replacement.
- Uses its own extension ID/storage and separate local cache prefixes.
- No new Home capability package and no engine source patch.
- Does not enable or modify the original Mallang receipt extension.

Historical rate tables are retained. LinkAPI shared-account aggregation and NanoGPT prepaid/subscription presentation are handled separately as described below. Displayed estimates are not necessarily actual billed amounts. Exact billing reconciliation is outside this UI separation change. External balance integrations require compatible service credentials and browser/network access; not every provider's authenticated flow has been tested here.

## Maintenance

Read AGENTS.md before editing. Version 0.3.0 targets the currently inspected Marinara 2.5.0 DOM. A future Home redesign may require updating the tab adapter.

The original legacy closure contains dormant non-receipt helpers; the adapter only exposes receipt/credit UI and scopes its document access. Do not treat this first separation as a complete rewrite of the original extension.

No private settings, keys, chat text, actual usage logs or screenshots of the owner's live chats are committed.

## 0.1.1 — Korean interface

Settings, buttons, service-specific instructions, placeholders, refresh labels and common errors are localized to Korean. Brand names, model names, account values, machine identifiers and billing logic remain unchanged. Existing saved settings are preserved.

## 0.2.0 — Shared LinkAPI account and prepaid NanoGPT

- Up to 10 underlying credit configurations (a shared LinkAPI account may contain several key profiles).
- LinkAPI profiles in the same account group render as one account card. Existing profiles, IDs, keys, connection selections and multipliers are retained separately inside its expandable settings.
- All existing LinkAPI profiles default to the shared `default` group, as confirmed by the owner. For a different account, set a different account-group name in that key profile. Grouping does not prove ownership of an account.
- The receipt counts authoritative account totals once. Otherwise it unions API usage logs by request ID, keeping separate requests even when timestamps/model/cost match. Logged charged amounts are not multiplied again.
- Chat fallback amounts matched by several LinkAPI profiles are removed from the general provider rows only once when replacing them with a shared-account row.
- Old caches without request IDs are retained privately as legacy rows, then refreshed. If current logs are unavailable, a single representative snapshot is labeled as a reference rather than summing potentially overlapping amounts. Missing/partial coverage is disclosed; missing logs are not treated as confirmed zero spend.
- A shared balance is never the sum of key balances. If account access-token data is available, use its account balance. Otherwise enter the site's current balance once under `공유 잔액 기준 설정`; later uniquely identified logged charges are deducted from that baseline. Existing key-level balance values are retained as reference values until a shared baseline is entered.
- NanoGPT chargeable usage remains included in costs. Inactive subscription metadata is not shown as a flat-fee subscription. An actual active subscription may be displayed separately.

Tests cover duplicate request IDs, separate requests with equal timestamps/costs, distinct account groups, missing caches, legacy uncertainty, currencies, stored multiplier preservation, the prepaid subtotal, and a real 10-card UI limit. These are deterministic tests, not a reconciliation of the owner's real provider invoices.

## 0.3.0 — Summary and connection labels

- Today and month usage are both prominent at the top of the receipt, including narrow mobile screens.
- The tab and heading use an owner-provided sticker sheet, displayed through a scoped CSS crop. The original sheet is preserved under assets and embedded once in the standalone script.
- Custom-provider chat estimates are separated by model. They never inherit the first connection name: several services share the same provider identifier, which previously mislabeled unrelated spending as DeepSeek. These historical buckets lack connection IDs and remain labeled as chat estimates rather than confirmed billing attribution.
- The DeepSeek balance card explains that its usage starts at the first balance observation and cannot backfill earlier charges. Existing saved balances, keys, connection selections and multipliers are preserved.
