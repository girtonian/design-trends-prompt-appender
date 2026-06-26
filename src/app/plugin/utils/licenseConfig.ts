/** Lemon Squeezy / Gumroad checkout URL — set in .env as VITE_PRO_CHECKOUT_URL */
export const PRO_CHECKOUT_URL =
  import.meta.env.VITE_PRO_CHECKOUT_URL?.trim() ?? "";

export function hasCheckoutUrl(): boolean {
  return PRO_CHECKOUT_URL.length > 0;
}
