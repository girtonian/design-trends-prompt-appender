import type { AspectRatioPreset } from "./aspectRatioPresets";
import {
  GENERATION_TARGET_KEY,
  MAKE_IMAGE_TARGET_KEY,
  type MakeImageTargetData,
} from "./generationFrame";

type ResizableMakeImageNode = (RectangleNode | FrameNode) & LayoutMixin;

function isResizableNode(node: BaseNode): node is ResizableMakeImageNode {
  return (node.type === "RECTANGLE" || node.type === "FRAME") && "resize" in node;
}

function readFills(node: GeometryMixin): readonly Paint[] | null {
  if (!("fills" in node)) return null;
  const fills = node.fills;
  if (fills === figma.mixed || !Array.isArray(fills)) return null;
  return fills;
}

function hasLegacyGenerationTarget(node: BaseNode): boolean {
  if (!("getPluginData" in node)) return false;
  return Boolean(node.getPluginData(GENERATION_TARGET_KEY));
}

function hasMakeImageTargetTag(node: BaseNode): boolean {
  if (!("getPluginData" in node)) return false;
  return Boolean(node.getPluginData(MAKE_IMAGE_TARGET_KEY));
}

function hasVisibleImageFill(node: GeometryMixin): boolean {
  const fills = readFills(node);
  if (!fills) return false;

  return fills.some(
    (paint) => paint.type === "IMAGE" && paint.visible !== false
  );
}

function hasDashedStroke(node: GeometryMixin & MinimalStrokesMixin): boolean {
  if (!("strokeDashes" in node)) return false;
  const dashes = node.strokeDashes;
  return Array.isArray(dashes) && dashes.length > 0;
}

function isMakeImageLayerName(name: string): boolean {
  const normalized = name.trim().toLowerCase();
  if (normalized === "image" || normalized === "rectangle") return true;
  return /^(image|rectangle)(\s|$|—|-)/i.test(name.trim());
}

function isLegacyPluginWhiteFrame(node: BaseNode): boolean {
  if (hasLegacyGenerationTarget(node)) return true;
  if (node.type !== "FRAME") return false;
  if (!node.name.startsWith("Make Image ")) return false;

  const fills = readFills(node as GeometryMixin);
  if (!fills) return true;
  return !fills.some((paint) => paint.type === "IMAGE" && paint.visible !== false);
}

export function isMakeImageTarget(node: BaseNode): node is ResizableMakeImageNode {
  if (!isResizableNode(node)) return false;
  if (isLegacyPluginWhiteFrame(node)) return false;
  if (hasMakeImageTargetTag(node)) return true;

  const geometry = node as GeometryMixin;
  const strokes = node as GeometryMixin & MinimalStrokesMixin;

  return (
    hasVisibleImageFill(geometry) ||
    hasDashedStroke(strokes) ||
    isMakeImageLayerName(node.name)
  );
}

export function findMakeImageTargetInSelection(
  selection: readonly SceneNode[]
): ResizableMakeImageNode | null {
  if (selection.length !== 1) return null;
  const node = selection[0];
  return isMakeImageTarget(node) ? node : null;
}

export function resizeMakeImageTarget(
  node: ResizableMakeImageNode,
  width: number,
  height: number
): void {
  const cx = node.x + node.width / 2;
  const cy = node.y + node.height / 2;
  node.resize(width, height);
  node.x = cx - width / 2;
  node.y = cy - height / 2;
}

export function tagMakeImageTarget(
  node: BaseNode,
  aspectRatio: AspectRatioPreset
): void {
  if (!("setPluginData" in node)) return;

  const data: MakeImageTargetData = {
    aspectRatio,
    updatedAt: Date.now(),
  };
  node.setPluginData(MAKE_IMAGE_TARGET_KEY, JSON.stringify(data));
}
