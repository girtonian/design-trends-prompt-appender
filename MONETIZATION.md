# Monetization & launch guide

## Free vs Pro

| Tier | Trends | Controls |
|------|--------|----------|
| **Free** | 6 styles (Imperfect Minimalism → Ethereal Botanics) | Aspect ratio |
| **Pro** | All 10 styles | Sticker + Theme, Chibi, Patches, Color |

Pro is unlocked in-plugin with a license key after purchase.

---

## 1. Create your payment product (Lemon Squeezy recommended)

1. Sign up at [lemonsqueezy.com](https://lemonsqueezy.com)
2. Create a **Digital Product** with **One-time** pricing
3. Enable **License keys** on the product (Settings → License keys → Generate)
4. Copy the **Checkout URL** for the product
5. Paste it into `.env`:

```env
VITE_PRO_CHECKOUT_URL=https://your-store.lemonsqueezy.com/checkout/buy/...
```

6. Rebuild: `pnpm run build`

### Gumroad alternative

Gumroad also supports license keys. Use their product permalink as `VITE_PRO_CHECKOUT_URL` and adapt validation in `licenseSandbox.ts` if you prefer Gumroad's API.

---

## 2. Contra (marketing only)

Use Contra as a **sales page**, not the license backend:

- List the plugin with demo video and price
- **Buy button** → same Lemon Squeezy checkout URL
- **After purchase** instructions:

> Install **Trend Tap** from Figma Community (free). Open the plugin → paste your license key from email → Pro unlocks instantly.

---

## 3. Figma Community listing

**Title:** Trend Tap

**Short description:**
Turn curated 2026 design trends into Weave-ready AI prompts. One tap copies prompts and saves creative direction to your frames.

**Free tier:**
- 6 design trend styles with example imagery
- Aspect ratio presets for Make an image

**Pro unlock (one-time purchase):**
- 4 additional trends (Fragmented Type, Xerox Punk, Broadcast Signals, Dithering ASCII)
- Sticker mode (single + sheet layouts)
- Theme categories for subjects
- Chibi character mode
- Xerox Punk embroidered patches
- Dithering ASCII full-color mode

**How to upgrade:**
Click **Buy Pro** in the plugin or purchase via your checkout link. You'll receive a license key by email. Paste it in the plugin to unlock Pro.

---

## 4. Test license flow

1. Use Lemon Squeezy **Test mode** to create a test purchase
2. Copy the test license key from the receipt email
3. In Figma: Plugins → Development → Import plugin from manifest → select this repo's `manifest.json`
4. Open plugin → paste key → **Activate**
5. Confirm all 10 trends and Pro controls appear

---

## 5. Phase 2 (optional)

If you receive **Figma Community seller approval**, you can add native checkout via `figma.payments` while keeping license keys for Contra/site buyers. See [Figma Payments API](https://developers.figma.com/docs/plugins/requiring-payment/).

---

## Files

| File | Purpose |
|------|---------|
| `src/app/data/tierConfig.ts` | Free vs Pro trend IDs |
| `src/app/plugin/utils/licenseSandbox.ts` | Lemon Squeezy activate/validate |
| `src/app/components/UpgradePanel.tsx` | Buy + license key UI |
| `.env` | `VITE_PRO_CHECKOUT_URL` |
