import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      theme="light"
      closeButton
      className="toaster group"
      toastOptions={{
        closeButtonAriaLabel: "Dismiss notification",
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
    />
  );
}
