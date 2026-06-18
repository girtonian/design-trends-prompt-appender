import { resizePluginUI } from "../plugin/utils/figmaMessaging";

const MIN_WIDTH = 280;
const MAX_WIDTH = 680;
const MIN_HEIGHT = 400;
const MAX_HEIGHT = 900;

type ResizeAxis = "width" | "height" | "both";

function clampSize(width: number, height: number) {
  return {
    width: Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, Math.round(width))),
    height: Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, Math.round(height))),
  };
}

function cursorForAxis(axis: ResizeAxis) {
  switch (axis) {
    case "width":
      return "col-resize";
    case "height":
      return "row-resize";
    default:
      return "nwse-resize";
  }
}

export function PluginResizeHandles() {
  const startResize = (axis: ResizeAxis) => (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = window.innerWidth;
    const startHeight = window.innerHeight;

    document.body.style.userSelect = "none";
    document.body.style.cursor = cursorForAxis(axis);

    const onMouseMove = (moveEvent: MouseEvent) => {
      let width = startWidth;
      let height = startHeight;

      if (axis === "width" || axis === "both") {
        width = startWidth + (moveEvent.clientX - startX);
      }
      if (axis === "height" || axis === "both") {
        height = startHeight + (moveEvent.clientY - startY);
      }

      const size = clampSize(width, height);
      resizePluginUI(size.width, size.height);
    };

    const onMouseUp = () => {
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <>
      <div
        className="figma-resize-handle figma-resize-handle-right"
        onMouseDown={startResize("width")}
        aria-hidden="true"
      />
      <div
        className="figma-resize-handle figma-resize-handle-bottom"
        onMouseDown={startResize("height")}
        aria-hidden="true"
      />
      <div
        className="figma-resize-handle figma-resize-handle-corner"
        onMouseDown={startResize("both")}
        aria-hidden="true"
      />
    </>
  );
}
