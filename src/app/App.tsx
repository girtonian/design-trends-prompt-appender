import { PluginController } from "./plugin/PluginController";

/**
 * Main App component - now using PluginController
 * for Figma plugin integration
 */
export default function App() {
  return <PluginController />;
}