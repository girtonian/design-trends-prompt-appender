export type PatchTypeId =
  | "embroidered"
  | "woven"
  | "chenille"
  | "leather"
  | "pvc-silicone"
  | "printed"
  | "bullion"
  | "name";

export interface PatchTypeOption {
  id: PatchTypeId;
  /** Short label for the dropdown trigger/menu. */
  label: string;
  /** Full description shown as a tooltip. */
  description: string;
  /** Condensed phrase appended to the copied prompt when this type is active. */
  promptSuffix: string;
  /** Negative guardrail keeping the generation away from conflicting textures. */
  negativeGuardrail: string;
}

export const DEFAULT_PATCH_TYPE_ID: PatchTypeId = "embroidered";

export const patchTypes: PatchTypeOption[] = [
  {
    id: "embroidered",
    label: "Embroidered",
    description:
      "Classic stitched patches with raised thread texture; best for bold designs and durable wear.",
    promptSuffix:
      "embroidered patch, raised stitched thread texture, bold durable design",
    negativeGuardrail: "flat print only, no textile texture",
  },
  {
    id: "woven",
    label: "Woven",
    description:
      "Similar to embroidered, but with a flatter weave that can show finer detail and small text better.",
    promptSuffix:
      "woven patch, flat tight weave, fine detail and crisp small text",
    negativeGuardrail: "thick raised embroidery texture, chenille fuzziness",
  },
  {
    id: "chenille",
    label: "Chenille",
    description:
      "Soft, fuzzy, and thick-looking patches often used for varsity or vintage style.",
    promptSuffix:
      "chenille patch, soft fuzzy thick pile texture, varsity vintage style",
    negativeGuardrail: "flat print, thin flat embroidery",
  },
  {
    id: "leather",
    label: "Leather",
    description:
      "More rugged or premium-looking patches, often embossed or debossed.",
    promptSuffix: "leather patch, embossed or debossed rugged premium finish",
    negativeGuardrail: "fabric thread texture, stitched embroidery look",
  },
  {
    id: "pvc-silicone",
    label: "PVC / Silicone",
    description:
      "Flexible rubber-like patches with crisp detail and a modern look.",
    promptSuffix: "PVC patch, flexible rubber-like material, crisp modern detail",
    negativeGuardrail: "fabric texture, thread stitching",
  },
  {
    id: "printed",
    label: "Printed",
    description:
      "Uses printing instead of dense stitching, which works well for full-color or highly detailed artwork.",
    promptSuffix:
      "printed patch, full-color printed artwork, fine detail, no dense stitching",
    negativeGuardrail: "raised thread texture, dense embroidery stitching",
  },
  {
    id: "bullion",
    label: "Bullion",
    description:
      "Decorative patches made with metal thread or wire for a more formal, ornate style.",
    promptSuffix:
      "bullion patch, metallic thread and wire embroidery, ornate formal style",
    negativeGuardrail: "plain thread embroidery, flat print",
  },
  {
    id: "name",
    label: "Name",
    description: "Personalized patches for names, ranks, or labels.",
    promptSuffix:
      "personalized name patch, embroidered lettering for names, ranks, or labels",
    negativeGuardrail: "illegible text, blurry lettering",
  },
];

export function getPatchTypeById(id: PatchTypeId): PatchTypeOption | undefined {
  return patchTypes.find((patchType) => patchType.id === id);
}

export function getPatchTypeLabel(id: PatchTypeId): string {
  return getPatchTypeById(id)?.label ?? "";
}

export function isPatchTypeId(value: unknown): value is PatchTypeId {
  return (
    typeof value === "string" &&
    patchTypes.some((patchType) => patchType.id === value)
  );
}
