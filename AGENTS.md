# Documentation

`consent.js` only loads the consent runtime and public analytics integration served by www from the marketing repository's `public/consent/`. Keep all consent interpretation, GPC, synchronization, storage cleanup and public revocation in that shared runtime.

PostHog pageviews use the shared public loader. Keep Mintlify's independent PostHog integration absent and `integrations.telemetry.enabled` false so native analytics cannot bypass the shared privacy controls. The architecture and chosen consent experience are documented in thundernetes at `console/CONSENT.md`.

The existing GA4/GTM loader and property verification are explicitly deferred; keep that entry unchanged until the user resumes that work. Verify `consent.js` syntax and run the integrated consent harness in thundernetes after consent changes.
