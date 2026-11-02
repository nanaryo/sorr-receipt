# Agent maintenance rules

- This is a `marinara.personal-extension`, not a capability/Home package.
- Read README.md and the root manifest first. Preserve config.name/runtime and saved-data compatibility.
- All receipt/credit UI belongs inside its ShadowRoot. Global CSS must be limited to the uniquely identified tab, reversible hidden-content/selection markers, and the extension-owned data-sorr-receipt-tabs row marker. Row layout overrides are mobile-only and must be restored on cleanup.
- Preserve Mallang Home, Sorr Gallery, the original disabled receipt extension and their data.
- Do not replace window.fetch or inject global fonts. Do not add paid model calls.
- Close/unmount must abort view-owned requests and clear timers, observers and listeners. External-extension cleanup must remove the tab and restore native content/selection.
- Keep the button immediately after `marinara-home-tab-home-gallery`. Inspect current native DOM before changing selectors.
- Recheck PC/mobile, light/dark, switching native tabs, leaving Home, re-entering, saved settings and cleanup after changes.
- Billing estimates and actual provider charges are distinct. Do not silently alter legacy pricing or claim actual charge reconciliation from this UI work.
- Never commit account credentials, private settings, usage logs or chat data.
- Live changes require user approval and a scoped rollback; approval for an existing scope remains valid.
- This was adapted from the owner's installed Mallang receipt source. No new license or third-party authorship claim is assigned by this repository.

- LinkAPI token-log `id` values are moving ordinals. Use `request_id` and schema-3 caches; keep the collision/reordering regression intact. Never persist view-owned `busy` flags.
- The optional tracker companion in maintenance is read-only and uses existing authenticated memory-module routes. Keep token totals and inferred current-connection model labels distinct from billed money; historical runs lack model snapshots and input/output splits. Do not expose run content or connection credentials.

- The usage calendar belongs above the receipt grid. Use UTC consistently for every source because NanoGPT only supplies UTC day buckets. Do not split balance-only period totals into invented daily amounts, silently add unknown charges, or present missing history as zero. Keep the shared-request and date-boundary regression.
