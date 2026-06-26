/** Trend IDs included in the free tier (Imperfect Minimalism → Ethereal Botanics). */
export const FREE_TREND_IDS = [1, 2, 3, 4, 5, 6] as const;

/** Trend IDs unlocked with Pro (Fragmented Type → Dithering ASCII). */
export const PRO_TREND_IDS = [7, 8, 9, 10] as const;

export type FreeTrendId = (typeof FREE_TREND_IDS)[number];
export type ProTrendId = (typeof PRO_TREND_IDS)[number];

export function isFreeTrendId(trendId: number): trendId is FreeTrendId {
  return (FREE_TREND_IDS as readonly number[]).includes(trendId);
}

export function isProTrendId(trendId: number): trendId is ProTrendId {
  return (PRO_TREND_IDS as readonly number[]).includes(trendId);
}

export function isTrendAvailableForTier(trendId: number, isPro: boolean): boolean {
  return isPro || isFreeTrendId(trendId);
}

export const PRO_FEATURE_SUMMARY =
  "Unlock 4 trends + Sticker, Chibi, Patches & Color modes";
