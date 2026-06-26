import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { getThemeById, promptThemes, type ThemeId } from "../data/themes";

interface ThemeSelectProps {
  value: ThemeId | null;
  onChange: (id: ThemeId | null) => void;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ThemeSelect({
  value,
  onChange,
  disabled = false,
  onOpenChange,
}: ThemeSelectProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const setMenuOpen = (next: boolean) => {
    setOpen(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (!open) return;

    const onDocumentMouseDown = (event: MouseEvent) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onDocumentMouseDown);
    return () => document.removeEventListener("mousedown", onDocumentMouseDown);
  }, [open]);

  const label = value ? getThemeById(value)?.label ?? "Theme…" : "Theme…";

  return (
    <div className="figma-theme-select" ref={rootRef}>
      <button
        type="button"
        className="figma-select figma-theme-select-trigger"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Theme category"
        title={
          disabled
            ? "Select Sticker, Chibi, or Patches to choose a theme"
            : "Theme category for subjects"
        }
        onMouseDown={(event) => event.stopPropagation()}
        onClick={(event) => {
          event.stopPropagation();
          if (!disabled) setMenuOpen(!open);
        }}
      >
        <span className="figma-theme-select-label truncate">{label}</span>
        <ChevronDown
          className={`figma-theme-select-chevron ${open ? "figma-theme-select-chevron-open" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <ul className="figma-theme-select-menu" role="listbox" aria-label="Themes">
          {promptThemes.map((theme) => {
            const isActive = value === theme.id;
            return (
              <li key={theme.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  className={`figma-theme-select-option ${isActive ? "figma-theme-select-option-active" : ""}`}
                  onMouseDown={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation();
                    onChange(theme.id);
                    setMenuOpen(false);
                  }}
                >
                  {theme.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
