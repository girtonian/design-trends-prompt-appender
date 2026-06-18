/**
 * Root plugin controller component
 * Manages plugin state, Figma selection changes, and coordinates UI
 */

import { useState, useEffect, createContext, useContext } from "react";
import {
  StoredTrendData,
  onPluginMessage,
  requestSelection,
  getTrendData,
  type FigmaNode,
} from "./utils/figmaMessaging";
import {
  resolveStickerFormatFromLegacy,
  type StickerFormat,
} from "./utils/promptBuilder";
import type { ThemeId } from "../data/themes";
import {
  DEFAULT_ASPECT_RATIO,
  type AspectRatioPreset,
} from "./utils/aspectRatioPresets";
import { TrendBrowser } from "./TrendBrowser";
import { Toaster } from "../components/ui/sonner";

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

function restoreStickerFormat(data: StoredTrendData | null): StickerFormat {
  if (!data) return "off";
  return resolveStickerFormatFromLegacy(data.stickerFormat, data.stickerMode);
}

function restoreThemeId(data: StoredTrendData | null): ThemeId | null {
  return data?.selectedThemeId ?? null;
}

export function PluginController() {
  const [selectedNodes, setSelectedNodes] = useState<FigmaNode[]>([]);
  const [currentTrendData, setCurrentTrendData] = useState<StoredTrendData | null>(null);
  const [stickerFormat, setStickerFormat] = useState<StickerFormat>("off");
  const [selectedThemeId, setSelectedThemeId] = useState<ThemeId | null>(null);
  const [selectedAspectRatio, setSelectedAspectRatio] =
    useState<AspectRatioPreset>(DEFAULT_ASPECT_RATIO);
  const [activeGenerationTarget, setActiveGenerationTarget] =
    useState<ActiveGenerationTarget | null>(null);

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
            if (!node.isMakeImageTarget) {
              getTrendData(node.id);
            } else {
              setCurrentTrendData(null);
            }
          } else {
            setCurrentTrendData(null);
          }
          break;
        case "trend-data":
          setCurrentTrendData(message.data);
          if (message.data) {
            setStickerFormat(restoreStickerFormat(message.data));
            setSelectedThemeId(restoreThemeId(message.data));
          }
          break;
        case "save-success":
        case "clear-success":
          refreshSelection();
          break;
        case "aspect-ratio-preference":
          if (message.aspectRatio) {
            setSelectedAspectRatio(message.aspectRatio);
          }
          break;
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
        default:
          break;
      }
    });

    requestSelection();
    return cleanup;
  }, []);

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
    activeGenerationTarget,
  };

  return (
    <PluginContext.Provider value={contextValue}>
      <TrendBrowser />
      <Toaster />
    </PluginContext.Provider>
  );
}
