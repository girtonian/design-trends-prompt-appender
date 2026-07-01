/**
 * Root plugin controller component
 * Manages plugin state, Figma selection changes, and coordinates UI
 */

import { useState, useEffect, useRef, createContext, useContext } from "react";
import {
  onPluginMessage,
  requestSelection,
  getTrendData,
  loadLicenseStatus,
  savePluginPreferences,
  type FigmaNode,
  type StoredTrendData,
} from "./utils/figmaMessaging";
import type { LicenseUiStatus } from "./utils/licenseTypes";
import { type StickerFormat } from "./utils/promptBuilder";
import type { ThemeId } from "../data/themes";
import { DEFAULT_PATCH_TYPE_ID, type PatchTypeId } from "../data/patchTypes";
import {
  DEFAULT_ASPECT_RATIO,
  getClosestAspectRatioPreset,
  type AspectRatioPreset,
} from "./utils/aspectRatioPresets";
import { TrendBrowser } from "./TrendBrowser";

export interface ActiveGenerationTarget {
  nodeId: string;
  nodeName: string;
  width: number;
  height: number;
  aspectRatio: AspectRatioPreset;
}

interface PluginContextState {
  selectedNodes: FigmaNode[];
  currentTrendData: StoredTrendData | null;
  refreshSelection: () => void;
  stickerFormat: StickerFormat;
  setStickerFormat: (format: StickerFormat) => void;
  selectedThemeId: ThemeId | null;
  setSelectedThemeId: (id: ThemeId | null) => void;
  selectedAspectRatio: AspectRatioPreset;
  setSelectedAspectRatio: (preset: AspectRatioPreset) => void;
  chibiMode: boolean;
  setChibiMode: (enabled: boolean) => void;
  patchMode: boolean;
  setPatchMode: (enabled: boolean) => void;
  patchType: PatchTypeId;
  setPatchType: (id: PatchTypeId) => void;
  ditheringColorMode: boolean;
  setDitheringColorMode: (enabled: boolean) => void;
  isPro: boolean;
  licenseStatus: LicenseUiStatus;
  licenseKeyMasked?: string;
  setLicenseActivating: () => void;
  activeGenerationTarget: ActiveGenerationTarget | null;
}

const PluginContext = createContext<PluginContextState | null>(null);

export function usePluginContext() {
  const context = useContext(PluginContext);
  if (!context) {
    throw new Error("usePluginContext must be used within PluginController");
  }
  return context;
}

export function PluginController() {
  const [selectedNodes, setSelectedNodes] = useState<FigmaNode[]>([]);
  const [currentTrendData, setCurrentTrendData] = useState<StoredTrendData | null>(null);
  const [stickerFormat, setStickerFormat] = useState<StickerFormat>("off");
  const [selectedThemeId, setSelectedThemeId] = useState<ThemeId | null>(null);
  const [selectedAspectRatio, setSelectedAspectRatio] =
    useState<AspectRatioPreset>(DEFAULT_ASPECT_RATIO);
  const [chibiMode, setChibiMode] = useState(false);
  const [patchMode, setPatchMode] = useState(false);
  const [patchType, setPatchType] = useState<PatchTypeId>(DEFAULT_PATCH_TYPE_ID);
  const [ditheringColorMode, setDitheringColorMode] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [licenseStatus, setLicenseStatus] =
    useState<LicenseUiStatus>("loading");
  const [licenseKeyMasked, setLicenseKeyMasked] = useState<string | undefined>();
  const [activeGenerationTarget, setActiveGenerationTarget] =
    useState<ActiveGenerationTarget | null>(null);
  const aspectSyncedFromCanvasRef = useRef(false);
  const preferencesLoadedRef = useRef(false);

  const refreshSelection = () => {
    requestSelection();
  };

  useEffect(() => {
    const cleanup = onPluginMessage((message) => {
      switch (message.type) {
        case "selection-changed":
          setSelectedNodes(message.selection);
          if (message.selection.length === 1) {
            const node = message.selection[0];
            if (
              node.isMakeImageTarget &&
              node.width != null &&
              node.height != null
            ) {
              const aspectRatio = getClosestAspectRatioPreset(
                node.width,
                node.height
              );
              aspectSyncedFromCanvasRef.current = true;
              setSelectedAspectRatio(aspectRatio);
              setActiveGenerationTarget({
                nodeId: node.id,
                nodeName: node.name,
                width: node.width,
                height: node.height,
                aspectRatio,
              });
              setCurrentTrendData(null);
            } else if (!node.isMakeImageTarget) {
              aspectSyncedFromCanvasRef.current = false;
              setActiveGenerationTarget(null);
              getTrendData(node.id);
            } else {
              aspectSyncedFromCanvasRef.current = false;
              setActiveGenerationTarget(null);
              setCurrentTrendData(null);
            }
          } else {
            aspectSyncedFromCanvasRef.current = false;
            setActiveGenerationTarget(null);
            setCurrentTrendData(null);
          }
          break;
        case "trend-data":
          setCurrentTrendData(message.data);
          break;
        case "save-success":
        case "clear-success":
          refreshSelection();
          break;
        case "aspect-ratio-preference":
          if (message.aspectRatio && !aspectSyncedFromCanvasRef.current) {
            setSelectedAspectRatio(message.aspectRatio);
          }
          break;
        case "plugin-preferences": {
          if (
            message.stickerFormat === "off" ||
            message.stickerFormat === "single" ||
            message.stickerFormat === "sheet"
          ) {
            setStickerFormat(message.stickerFormat);
          }
          if (message.selectedThemeId !== undefined) {
            setSelectedThemeId(message.selectedThemeId);
          }
          if (typeof message.chibiMode === "boolean") {
            setChibiMode(message.chibiMode);
          }
          if (typeof message.patchMode === "boolean") {
            setPatchMode(message.patchMode);
          }
          if (message.patchType) {
            setPatchType(message.patchType);
          }
          if (typeof message.ditheringColorMode === "boolean") {
            setDitheringColorMode(message.ditheringColorMode);
          }
          preferencesLoadedRef.current = true;
          break;
        }
        case "generation-target-ready":
          if (message.resized && message.nodeId && message.nodeName) {
            setActiveGenerationTarget({
              nodeId: message.nodeId,
              nodeName: message.nodeName,
              width: message.width,
              height: message.height,
              aspectRatio: message.aspectRatio,
            });
          }
          break;
        case "license-status":
          setIsPro(message.isPro === true);
          setLicenseStatus(
            message.isPro ? (message.status ?? "pro") : "free"
          );
          setLicenseKeyMasked(message.licenseKeyMasked);
          break;
        case "license-activated":
          setIsPro(true);
          setLicenseStatus("pro");
          setLicenseKeyMasked(message.licenseKeyMasked);
          break;
        case "license-error":
          setIsPro(false);
          setLicenseStatus("free");
          break;
        default:
          break;
      }
    });

    requestSelection();
    loadLicenseStatus();
    return cleanup;
  }, []);

  useEffect(() => {
    if (!preferencesLoadedRef.current) return;
    savePluginPreferences({
      stickerFormat,
      selectedThemeId,
      chibiMode,
      patchMode,
      patchType,
      ditheringColorMode,
    });
  }, [
    stickerFormat,
    selectedThemeId,
    chibiMode,
    patchMode,
    patchType,
    ditheringColorMode,
  ]);

  const setLicenseActivating = () => {
    setLicenseStatus("activating");
  };

  const contextValue: PluginContextState = {
    selectedNodes,
    currentTrendData,
    refreshSelection,
    stickerFormat,
    setStickerFormat,
    selectedThemeId,
    setSelectedThemeId,
    selectedAspectRatio,
    setSelectedAspectRatio,
    chibiMode,
    setChibiMode,
    patchMode,
    setPatchMode,
    patchType,
    setPatchType,
    ditheringColorMode,
    setDitheringColorMode,
    isPro,
    licenseStatus,
    licenseKeyMasked,
    setLicenseActivating,
    activeGenerationTarget,
  };

  return (
    <PluginContext.Provider value={contextValue}>
      <TrendBrowser />
    </PluginContext.Provider>
  );
}
