/**
 * Root plugin controller component
 * Manages plugin state, Figma selection changes, and coordinates sidebar + modal
 */

import { useState, useEffect, createContext, useContext } from "react";
import { StoredTrendData } from "./utils/figmaStorage";
import { onPluginMessage, requestSelection, getTrendData, type FigmaNode } from "./utils/figmaMessaging";
import { Sidebar } from "./Sidebar";
import { TrendModal } from "./TrendModal";
import { Toaster } from "../components/ui/sonner";

/**
 * Plugin context state interface
 */
interface PluginContextState {
  selectedNodes: FigmaNode[];
  currentTrendData: StoredTrendData | null;
  modalOpen: boolean;
  modalView: 'grid' | 'detail';
  selectedTrendId: number | null;
  setModalOpen: (open: boolean) => void;
  setModalView: (view: 'grid' | 'detail') => void;
  setSelectedTrendId: (id: number | null) => void;
  refreshSelection: () => void;
}

/**
 * Context for sharing plugin state across components
 */
const PluginContext = createContext<PluginContextState | null>(null);

/**
 * Hook to access plugin context
 */
export function usePluginContext() {
  const context = useContext(PluginContext);
  if (!context) {
    throw new Error('usePluginContext must be used within PluginController');
  }
  return context;
}

/**
 * Main plugin controller component
 */
export function PluginController() {
  const [selectedNodes, setSelectedNodes] = useState<FigmaNode[]>([]);
  const [currentTrendData, setCurrentTrendData] = useState<StoredTrendData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalView, setModalView] = useState<'grid' | 'detail'>('grid');
  const [selectedTrendId, setSelectedTrendId] = useState<number | null>(null);

  /**
   * Request selection update from plugin
   */
  const refreshSelection = () => {
    requestSelection();
  };

  /**
   * Set up message listener for plugin communication
   */
  useEffect(() => {
    const cleanup = onPluginMessage((message) => {
      switch (message.type) {
        case 'selection-changed':
          setSelectedNodes(message.selection);

          // Request trend data for single selection
          if (message.selection.length === 1) {
            getTrendData(message.selection[0].id);
          } else {
            setCurrentTrendData(null);
          }
          break;

        case 'trend-data':
          setCurrentTrendData(message.data);
          break;

        case 'save-success':
          // Refresh selection after save
          refreshSelection();
          break;

        case 'clear-success':
          // Refresh selection after clear
          refreshSelection();
          break;

        default:
          break;
      }
    });

    // Request initial selection
    requestSelection();

    return cleanup;
  }, []);

  /**
   * Context value to share with child components
   */
  const contextValue: PluginContextState = {
    selectedNodes,
    currentTrendData,
    modalOpen,
    modalView,
    selectedTrendId,
    setModalOpen,
    setModalView,
    setSelectedTrendId,
    refreshSelection,
  };

  return (
    <PluginContext.Provider value={contextValue}>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar Panel */}
        <Sidebar />

        {/* Trend Browser Modal */}
        {modalOpen && <TrendModal />}

        {/* Toast Notifications */}
        <Toaster />
      </div>
    </PluginContext.Provider>
  );
}
