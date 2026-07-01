import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { getPatchTypeById, patchTypes, type PatchTypeId } from "../data/patchTypes";

interface PatchTypeSelectProps {
  value: PatchTypeId;
  onChange: (id: PatchTypeId) => void;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function PatchTypeSelect({
  value,
  onChange,
  disabled = false,
  onOpenChange,
}: PatchTypeSelectProps) {
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

  const label = getPatchTypeById(value)?.label ?? "Embroidered";

  return (
    <div className="figma-theme-select" ref={rootRef}>
      <button
        type="button"
        className="figma-select figma-theme-select-trigger"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Patch type"
        title={
          disabled
            ? "Turn on Patches to choose a patch type"
            : "Patch material for the copied prompt"
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
        <ul className="figma-theme-select-menu" role="listbox" aria-label="Patch types">
          {patchTypes.map((patchType) => {
            const isActive = value === patchType.id;
            return (
              <li key={patchType.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  title={patchType.description}
                  className={`figma-theme-select-option ${isActive ? "figma-theme-select-option-active" : ""}`}
                  onMouseDown={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation();
                    onChange(patchType.id);
                    setMenuOpen(false);
                  }}
                >
                  {patchType.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
