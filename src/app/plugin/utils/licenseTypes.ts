export const LICENSE_STORAGE_KEY = "proLicense";

/** Offline grace period after last successful online validation. */
export const LICENSE_GRACE_MS = 7 * 24 * 60 * 60 * 1000;

export interface StoredLicense {
  licenseKey: string;
  instanceId: string;
  validatedAt: number;
}

export type LicenseUiStatus =
  | "loading"
  | "free"
  | "pro"
  | "grace"
  | "activating"
  | "error";

export interface LicenseStatusPayload {
  isPro: boolean;
  status: "free" | "pro" | "grace";
  validatedAt?: number;
  licenseKeyMasked?: string;
}

export interface LicenseErrorPayload {
  error: string;
}

export interface LicenseActivatedPayload {
  isPro: true;
  validatedAt: number;
  licenseKeyMasked: string;
}
