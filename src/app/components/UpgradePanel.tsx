import { useState } from "react";
import { Lock } from "lucide-react";
import { PRO_FEATURE_SUMMARY } from "../data/tierConfig";
import { hasCheckoutUrl, PRO_CHECKOUT_URL } from "../plugin/utils/licenseConfig";
import { openCheckoutUrl } from "../plugin/utils/figmaMessaging";
import type { LicenseUiStatus } from "../plugin/utils/licenseTypes";

interface UpgradePanelProps {
  licenseStatus: LicenseUiStatus;
  licenseKeyMasked?: string;
  onActivate: (licenseKey: string) => void;
  onError: (message: string) => void;
}

export function UpgradePanel({
  licenseStatus,
  licenseKeyMasked,
  onActivate,
  onError,
}: UpgradePanelProps) {
  const [licenseInput, setLicenseInput] = useState("");
  const isActivating = licenseStatus === "activating";

  const handleBuy = () => {
    if (!hasCheckoutUrl()) {
      onError("Checkout URL is not configured yet.");
      return;
    }
    openCheckoutUrl(PRO_CHECKOUT_URL);
  };

  const handleActivate = () => {
    const key = licenseInput.trim();
    if (!key) {
      onError("Enter your license key.");
      return;
    }
    onActivate(key);
  };

  return (
    <div className="figma-upgrade-panel shrink-0 mb-2 rounded-[var(--radius)] border border-[var(--figma-color-border,rgba(0,0,0,0.1))] bg-[var(--figma-color-bg-secondary,rgba(0,0,0,0.03))] px-2.5 py-2">
      <div className="flex items-start gap-2">
        <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-60" aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium leading-snug text-foreground">
            {PRO_FEATURE_SUMMARY}
          </p>
          <p className="mt-0.5 text-[10px] leading-snug text-muted-foreground">
            Free includes 6 styles + aspect ratio. Pro unlocks in-plugin.
          </p>
        </div>
        <button
          type="button"
          onClick={handleBuy}
          disabled={!hasCheckoutUrl() || isActivating}
          className="figma-btn shrink-0 px-2.5 text-[10px] font-medium"
        >
          Buy Pro
        </button>
      </div>

      <div className="mt-2 flex items-center gap-1.5">
        <input
          type="text"
          value={licenseInput}
          onChange={(event) => setLicenseInput(event.target.value)}
          placeholder="Paste license key"
          disabled={isActivating}
          className="figma-license-input min-w-0 flex-1"
          aria-label="License key"
        />
        <button
          type="button"
          onClick={handleActivate}
          disabled={isActivating}
          className="figma-btn shrink-0 px-2.5 text-[10px] font-medium"
        >
          {isActivating ? "…" : "Activate"}
        </button>
      </div>

      {licenseKeyMasked && licenseStatus === "grace" && (
        <p className="mt-1.5 text-[10px] text-muted-foreground">
          Pro active offline ({licenseKeyMasked}). Reconnect to revalidate.
        </p>
      )}
    </div>
  );
}
