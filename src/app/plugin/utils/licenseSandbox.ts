import {
  LICENSE_GRACE_MS,
  LICENSE_STORAGE_KEY,
  type StoredLicense,
} from "./licenseTypes";

const LS_ACTIVATE_URL = "https://api.lemonsqueezy.com/v1/licenses/activate";
const LS_VALIDATE_URL = "https://api.lemonsqueezy.com/v1/licenses/validate";

/** Author promo keys — remove this block before Figma Community launch. */
const PROMO_LICENSE_EXPIRY_MS = Date.UTC(2026, 6, 31, 23, 59, 59);
const PROMO_LICENSE_KEYS = new Set(["TRENDTAP-PROMO-M7XK-2026"]);

function normalizeLicenseKey(licenseKey: string): string {
  return licenseKey.trim().toUpperCase();
}

function isPromoLicenseKey(licenseKey: string): boolean {
  return (
    Date.now() <= PROMO_LICENSE_EXPIRY_MS &&
    PROMO_LICENSE_KEYS.has(normalizeLicenseKey(licenseKey))
  );
}

async function activatePromoLicense(licenseKey: string): Promise<{
  validatedAt: number;
  licenseKeyMasked: string;
}> {
  const normalized = normalizeLicenseKey(licenseKey);
  const validatedAt = Date.now();
  await writeStoredLicense({
    licenseKey: normalized,
    instanceId: "promo-media",
    validatedAt,
  });
  return { validatedAt, licenseKeyMasked: maskLicenseKey(normalized) };
}

interface LemonSqueezyLicenseResponse {
  activated?: boolean;
  valid?: boolean;
  error?: string | null;
  license_key?: { status?: string };
  instance?: { id?: string };
  meta?: { event?: string };
}

function maskLicenseKey(key: string): string {
  if (key.length <= 8) return "••••••••";
  return `${key.slice(0, 4)}••••${key.slice(-4)}`;
}

function getInstanceName(): string {
  const userId = figma.currentUser?.id;
  if (userId) return `figma-${userId}`;
  return `figma-anon-${Date.now()}`;
}

async function postLicenseRequest(
  url: string,
  body: Record<string, string>
): Promise<LemonSqueezyLicenseResponse> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as LemonSqueezyLicenseResponse;
  if (!response.ok && !data.error) {
    throw new Error("License server unavailable. Try again later.");
  }
  return data;
}

async function readStoredLicense(): Promise<StoredLicense | null> {
  try {
    const saved = await figma.clientStorage.getAsync(LICENSE_STORAGE_KEY);
    if (
      saved &&
      typeof saved === "object" &&
      typeof (saved as StoredLicense).licenseKey === "string" &&
      typeof (saved as StoredLicense).instanceId === "string" &&
      typeof (saved as StoredLicense).validatedAt === "number"
    ) {
      return saved as StoredLicense;
    }
  } catch {
    // ignore
  }
  return null;
}

async function writeStoredLicense(license: StoredLicense | null): Promise<void> {
  if (license) {
    await figma.clientStorage.setAsync(LICENSE_STORAGE_KEY, license);
  } else {
    await figma.clientStorage.deleteAsync(LICENSE_STORAGE_KEY);
  }
}

async function validateOnline(
  licenseKey: string,
  instanceId: string
): Promise<boolean> {
  const data = await postLicenseRequest(LS_VALIDATE_URL, {
    license_key: licenseKey,
    instance_id: instanceId,
  });

  if (data.error) return false;
  return data.valid === true || data.license_key?.status === "active";
}

async function activateOnline(
  licenseKey: string,
  instanceName: string
): Promise<{ instanceId: string }> {
  const data = await postLicenseRequest(LS_ACTIVATE_URL, {
    license_key: licenseKey,
    instance_name: instanceName,
  });

  if (data.error) {
    throw new Error(data.error);
  }

  const instanceId = data.instance?.id;
  if (!instanceId || (data.activated === false && !data.valid)) {
    throw new Error("Invalid or expired license key.");
  }

  return { instanceId };
}

export async function resolveLicenseStatus(): Promise<{
  isPro: boolean;
  status: "free" | "pro" | "grace";
  validatedAt?: number;
  licenseKeyMasked?: string;
}> {
  const stored = await readStoredLicense();
  if (!stored) {
    return { isPro: false, status: "free" };
  }

  if (isPromoLicenseKey(stored.licenseKey)) {
    return {
      isPro: true,
      status: "pro",
      validatedAt: stored.validatedAt,
      licenseKeyMasked: maskLicenseKey(stored.licenseKey),
    };
  }

  if (PROMO_LICENSE_KEYS.has(normalizeLicenseKey(stored.licenseKey))) {
    await writeStoredLicense(null);
    return { isPro: false, status: "free" };
  }

  try {
    const valid = await validateOnline(stored.licenseKey, stored.instanceId);
    if (valid) {
      const updated: StoredLicense = {
        ...stored,
        validatedAt: Date.now(),
      };
      await writeStoredLicense(updated);
      return {
        isPro: true,
        status: "pro",
        validatedAt: updated.validatedAt,
        licenseKeyMasked: maskLicenseKey(stored.licenseKey),
      };
    }
  } catch {
    const withinGrace =
      Date.now() - stored.validatedAt <= LICENSE_GRACE_MS;
    if (withinGrace) {
      return {
        isPro: true,
        status: "grace",
        validatedAt: stored.validatedAt,
        licenseKeyMasked: maskLicenseKey(stored.licenseKey),
      };
    }
  }

  await writeStoredLicense(null);
  return { isPro: false, status: "free" };
}

export async function activateLicenseKey(licenseKey: string): Promise<{
  validatedAt: number;
  licenseKeyMasked: string;
}> {
  const trimmed = licenseKey.trim();
  if (!trimmed) {
    throw new Error("Enter a license key.");
  }

  if (isPromoLicenseKey(trimmed)) {
    return activatePromoLicense(trimmed);
  }

  const { instanceId } = await activateOnline(trimmed, getInstanceName());
  const validatedAt = Date.now();
  await writeStoredLicense({
    licenseKey: trimmed,
    instanceId,
    validatedAt,
  });

  return { validatedAt, licenseKeyMasked: maskLicenseKey(trimmed) };
}

export async function clearStoredLicense(): Promise<void> {
  await writeStoredLicense(null);
}

export function openExternalCheckout(url: string): void {
  if (!url) {
    figma.notify("Checkout URL is not configured.");
    return;
  }
  figma.openExternal(url);
}
