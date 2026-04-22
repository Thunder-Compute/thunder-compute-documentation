# Google Ads API Design Document

**Tool Name:** Thunder Compute Offline Conversion Tracker
**Company:** Thunder Compute
**MCC ID:** 776-926-0242
**Customer ID:** 843-219-5844
**Date:** March 2026

---

## 1. Company & Product Overview

Thunder Compute is a GPU cloud compute platform that enables developers to run GPU workloads in the cloud. Thunder Compute runs Google Ads campaigns to acquire new users. To optimize ad spend and enable Smart Bidding, we need to attribute downstream revenue events (user spend thresholds) back to the original ad clicks using offline conversion tracking.

## 2. Tool Purpose

This tool is an **internal backend service** (not user-facing) that uploads offline conversions to Google Ads when users cross cumulative spend thresholds (\$10 and \$100). It uses the Google Click ID (`gclid`) captured at signup to attribute conversions to the original ad click. The goal is to enable Google Ads Smart Bidding to optimize for high-value users who generate real revenue.

## 3. API Usage

**Only endpoint used:** `uploadClickConversions` (Google Ads API v23, REST)

```
POST https://googleads.googleapis.com/v23/customers/{customerId}:uploadClickConversions
```

**No other Google Ads API endpoints are used.** The tool does **not**:

- Read or modify campaigns, ad groups, or ads
- Access reporting, analytics, or search queries
- Manage budgets or bidding strategies
- Create or modify any Google Ads resources
- Access any user data from Google Ads

## 4. Architecture & Data Flow

```
┌─────────────────────────────────────────────────────────┐
│                    DATA FLOW DIAGRAM                     │
└─────────────────────────────────────────────────────────┘

 1. USER CLICKS GOOGLE AD
    ───────────────────────────────────────────────────────
    User clicks ad → lands on console.thundercompute.com
    URL contains ?gclid=<click_id>

                              │
                              ▼

 2. FRONTEND CAPTURES GCLID
    ───────────────────────────────────────────────────────
    JavaScript reads gclid from URL query parameters
    Stores in browser localStorage as "tc_gclid"

                              │
                              ▼

 3. USER SIGNS UP & AUTHENTICATES
    ───────────────────────────────────────────────────────
    User creates account via Stytch authentication
    Frontend sends stored gclid to backend:

       POST /v1/gclid  { "gclid": "<click_id>" }

    Backend stores gclid in Firestore (billing document)

                              │
                              ▼

 4. USER MAKES PAYMENTS (days/weeks later)
    ───────────────────────────────────────────────────────
    User purchases GPU compute credits via Stripe
    Stripe sends invoice.paid webhook to our backend

                              │
                              ▼

 5. SPEND THRESHOLD CHECK
    ───────────────────────────────────────────────────────
    Stripe Webhooks Service receives payment event
    Atomically increments totalSpendCents in Firestore
    Checks cumulative spend against thresholds:
      • $10 threshold (1000 cents)
      • $100 threshold (10000 cents)

                              │
                     (threshold crossed)
                              │
                              ▼

 6. UPLOAD OFFLINE CONVERSION
    ───────────────────────────────────────────────────────
    Reads gclid from Firestore billing document
    Sends conversion to Google Ads API:

       POST /v23/customers/8432195844:uploadClickConversions

    Request body:
    {
      "conversions": [{
        "gclid": "<click_id>",
        "conversionAction": "<resource_name>",
        "conversionDateTime": "2026-03-06 12:00:00+00:00",
        "conversionValue": 50.0,
        "currencyCode": "USD"
      }],
      "partialFailure": true
    }
```

## 5. Conversion Actions

The tool tracks exactly **2 conversion actions**, both configured in Google Ads:

| Name | Trigger | Conversion Value | Resource Name |
|------|---------|-----------------|---------------|
| `spent_10_usd` | User's cumulative spend ≥ \$10 | \$50 | `customers/8432195844/conversionActions/7523309270` |
| `spent_100_usd` | User's cumulative spend ≥ \$100 | \$200 | `customers/8432195844/conversionActions/7523445082` |

Each user triggers **at most 2 API calls** over their entire lifetime (one per threshold).

## 6. Request Details

| Property | Value |
|----------|-------|
| **Authentication** | OAuth 2.0 with refresh token |
| **API version** | Google Ads API v23 (REST) |
| **Rate** | Very low — at most 2 API calls per paying user, not batched |
| **partialFailure** | Set to `true` per Google's recommendation |
| **HTTP timeout** | 15 seconds |

### Idempotency

Each threshold is tracked in Firestore using a `conversionsSent` map (e.g., `conversionsSent.spent_10_usd: true`). Threshold checks and flag updates happen inside a Firestore transaction to prevent duplicate uploads.

### Error Handling

Failures are logged with structured telemetry but **never block payment processing**. This is a best-effort integration — if a conversion upload fails, the payment still succeeds normally.

## 7. User Identifiers

- **Primary:** `gclid` (Google Click ID) — captured from the ad click URL at signup
- **Fallback:** SHA-256 hashed email address (enhanced conversions) — used only when gclid is unavailable

No plaintext personal data is sent to Google Ads. The hashed email uses `SHA-256(lowercase(trim(email)))` per Google's enhanced conversions specification.

## 8. Data Handling & Privacy

- The `gclid` is stored in Firestore, scoped to the organization's billing document
- No personal data is sent to Google Ads beyond `gclid` and SHA-256 hashed email
- Email addresses are hashed client-side (in our backend) before transmission
- Consent is handled per Google's EU user consent policy
- Data retention follows our standard Firestore retention policies

## 9. No User Interface

This tool is a **server-side integration with no user interface**. All interactions with the Google Ads API are automated and triggered by Stripe billing events.

The only "screens" involved are:

1. **Stripe webhook endpoint** — receives `invoice.paid` events from Stripe (inbound)
2. **Google Ads API call** — uploads offline conversion via HTTP POST (outbound)

There are no wireframes, dashboards, or user-facing screens because:
- The conversion tracking runs entirely in the backend
- No user action directly triggers a Google Ads API call
- No Google Ads data is displayed to users
- The tool only **writes** data to Google Ads (uploads conversions); it never **reads** data

---

*This document describes the complete scope of Thunder Compute's use of the Google Ads API. The integration is limited to a single endpoint (`uploadClickConversions`) used for offline conversion tracking to optimize ad campaign bidding.*
