# 소르 영수증 / Sorr Receipt

Marinara personal extension 0.1.1. Adds a receipt and credit-balance tab immediately after Sorr Gallery, with on/off control through the normal external-extension list.

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

The legacy accounting and historical rate tables are retained for now. Displayed estimates are not necessarily actual billed amounts. Exact billing reconciliation is outside this UI separation change. External balance integrations require compatible service credentials and browser/network access; not every provider's authenticated flow has been tested here.

## Maintenance

Read AGENTS.md before editing. Version 0.1.1 targets the currently inspected Marinara 2.5.0 DOM. A future Home redesign may require updating the tab adapter.

The original legacy closure contains dormant non-receipt helpers; the adapter only exposes receipt/credit UI and scopes its document access. Do not treat this first separation as a complete rewrite of the original extension.

No private settings, keys, chat text, actual usage logs or screenshots of the owner's live chats are committed.

## 0.1.1 — Korean interface

Settings, buttons, service-specific instructions, placeholders, refresh labels and common errors are localized to Korean. Brand names, model names, account values, machine identifiers and billing logic remain unchanged. Existing saved settings are preserved.
