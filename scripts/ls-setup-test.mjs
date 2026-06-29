// scripts/ls-setup-test.ts
import { readFileSync } from "fs";
import { resolve } from "path";
function loadEnv() {
  const envPath = resolve(process.cwd(), ".env");
  const raw = readFileSync(envPath, "utf8");
  const out = {};
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#"))
      continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1)
      continue;
    out[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return out;
}
async function lsFetch(apiKey2, path, init) {
  const response = await fetch(`https://api.lemonsqueezy.com${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${apiKey2}`,
      ...init?.headers ?? {}
    }
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(JSON.stringify(data, null, 2));
  }
  return data;
}
var env = loadEnv();
var apiKey = env.LEMONSQUEEZY_API_KEY;
if (!apiKey) {
  console.error("Missing LEMONSQUEEZY_API_KEY in .env");
  process.exit(1);
}
var stores = await lsFetch(apiKey, "/v1/stores");
var store = stores.data[0];
if (!store) {
  console.error("No stores found.");
  process.exit(1);
}
console.log(`Store: ${store.attributes.name} (id ${store.id})`);
console.log(`URL: ${store.attributes.url}`);
var products = await lsFetch(
  apiKey,
  `/v1/stores/${store.id}/products`
);
if (products.data.length === 0) {
  console.log("\nNo products yet. Create Trend Tap Pro in Lemon Squeezy first.");
  console.log("\nFor instant Pro in Figma (no LS purchase), use promo key:");
  console.log("  TRENDTAP-PROMO-M7XK-2026");
  process.exit(0);
}
for (const product of products.data) {
  console.log(`
Product: ${product.attributes.name} (id ${product.id})`);
  console.log(`  Status: ${product.attributes.status}`);
  console.log(`  Checkout: ${product.attributes.buy_now_url ?? "(none)"}`);
  const variants = await lsFetch(
    apiKey,
    `/v1/products/${product.id}/variants`
  );
  for (const variant of variants.data) {
    console.log(
      `  Variant: ${variant.attributes.name} (id ${variant.id}) \u2014 $${(variant.attributes.price / 100).toFixed(2)}${variant.attributes.is_subscription ? " / subscription" : ""}`
    );
  }
}
var licenseKeys = await lsFetch(
  apiKey,
  `/v1/stores/${store.id}/license-keys?page[size]=5`
);
if (licenseKeys.data.length > 0) {
  console.log("\nExisting license keys (latest):");
  for (const lk of licenseKeys.data) {
    const a = lk.attributes;
    console.log(
      `  ${a.key} \u2014 ${a.status} (${a.activation_usage}/${a.activation_limit} activations)`
    );
  }
} else {
  console.log("\nNo license keys yet. Complete a test checkout to generate one.");
  console.log("Lemon Squeezy test card: 4242 4242 4242 4242, any future expiry/CVC.");
}
console.log("\n--- Instant dev unlock (built into plugin) ---");
console.log("Paste in Trend Tap \u2192 Activate:");
console.log("  TRENDTAP-PROMO-M7XK-2026");
