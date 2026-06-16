/**
 * Root plugin controller component
 * Manages plugin state, Figma selection changes, and coordinates UI
 */

import { useState, useEffect, createContext, useContext } from "react";
import { StoredTrendData } from "./utils/figmaMessaging";
import { onPluginMessage, requestSelection, getTrendData, type FigmaNode } from "./utils/figmaMessaging";
import {
  resolveStickerFormatFromLegacy,
  type StickerFormat,
} from "./utils/promptBuilder";
import { TrendBrowser } from "./TrendBrowser";
import { Toaster } from "../components/ui/sonner";

interface PluginContextState {
  selectedNodes: FigmaNode[];
  currentTrendData: StoredTrendData | null;
  refreshSelection: () => void;
  stickerFormat: StickerFormat;
  setStickerFormat: (format: StickerFormat) => void;
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

export function PluginController() {
  const [selectedNodes, setSelectedNodes] = useState<FigmaNode[]>([]);
  const [currentTrendData, setCurrentTrendData] = useState<StoredTrendData | null>(null);
  const [stickerFormat, setStickerFormat] = useState<StickerFormat>("off");

  const refreshSelection = () => {
    requestSelection();
  };

  useEffect(() => {
    const cleanup = onPluginMessage((message) => {
      switch (message.type) {
        case "selection-changed":
          setSelectedNodes(message.selection);
          if (message.selection.length === 1) {
            getTrendData(message.selection[0].id);
          } else {
            setCurrentTrendData(null);
            setStickerFormat("off");
          }
          break;
        case "trend-data":
          setCurrentTrendData(message.data);
          setStickerFormat(restoreStickerFormat(message.data));
          break;
        case "save-success":
        case "clear-success":
          refreshSelection();
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
  };

  return (
    <PluginContext.Provider value={contextValue}>
      <TrendBrowser />
      <Toaster />
    </PluginContext.Provider>
  );
}
