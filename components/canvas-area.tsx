"use client";

import type React from "react";

import { useRef, useState } from "react";
import type { ElementType, LayoutConfig } from "./layout-builder";
import { Plus } from "lucide-react";

interface CanvasAreaProps {
  elements: ElementType[];
  layoutConfig: LayoutConfig;
  selectedElement: string | null;
  setSelectedElement: (id: string | null) => void;
  updateElement: (id: string, updates: Partial<ElementType>) => void;
}

export default function CanvasArea({
  elements,
  layoutConfig,
  selectedElement,
  setSelectedElement,
  updateElement,
}: CanvasAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [resizing, setResizing] = useState<boolean>(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startSize, setStartSize] = useState({ width: 0, height: 0 });

  const getContainerClasses = () => {
    let classes =
      "min-h-[400px] p-4 border-2 border-dashed rounded-lg relative";

    classes += " border-violet-300";

    if (layoutConfig.type === "flexbox") {
      classes += " flex";

      switch (layoutConfig.flexDirection) {
        case "row":
          classes += " flex-row";
          break;
        case "row-reverse":
          classes += " flex-row-reverse";
          break;
        case "column":
          classes += " flex-col";
          break;
        case "column-reverse":
          classes += " flex-col-reverse";
          break;
      }

      // Add justify content
      switch (layoutConfig.justifyContent) {
        case "flex-start":
          classes += " justify-start";
          break;
        case "flex-end":
          classes += " justify-end";
          break;
        case "center":
          classes += " justify-center";
          break;
        case "space-between":
          classes += " justify-between";
          break;
        case "space-around":
          classes += " justify-around";
          break;
        case "space-evenly":
          classes += " justify-evenly";
          break;
      }

      // Add align items
      switch (layoutConfig.alignItems) {
        case "flex-start":
          classes += " items-start";
          break;
        case "flex-end":
          classes += " items-end";
          break;
        case "center":
          classes += " items-center";
          break;
        case "stretch":
          classes += " items-stretch";
          break;
        case "baseline":
          classes += " items-baseline";
          break;
      }

      switch (layoutConfig.flexWrap) {
        case "nowrap":
          classes += " flex-nowrap";
          break;
        case "wrap":
          classes += " flex-wrap";
          break;
        case "wrap-reverse":
          classes += " flex-wrap-reverse";
          break;
      }

      // Add gap
      if (layoutConfig.gap) {
        classes += ` gap-${layoutConfig.gap}`;
      }
    } else if (layoutConfig.type === "grid") {
      classes += " grid";

      // Add grid columns and rows
      if (layoutConfig.gridCols) {
        classes += ` grid-cols-${layoutConfig.gridCols}`;
      }

      if (layoutConfig.gridRows) {
        classes += ` grid-rows-${layoutConfig.gridRows}`;
      }

      // Add gap
      if (layoutConfig.gap) {
        classes += ` gap-${layoutConfig.gap}`;
      }
    }

    return classes;
  };

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedElement(id);

    setDraggedElement(id);
    setStartPos({ x: e.clientX, y: e.clientY });

    const element = elements.find((el) => el.id === id);
    if (element) {
      setStartPos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleResizeStart = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedElement(id);
    setResizing(true);

    const element = elements.find((el) => el.id === id);
    if (element) {
      setStartPos({ x: e.clientX, y: e.clientY });
      setStartSize({ width: element.width, height: element.height });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedElement && !resizing) {
      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;

      // Find the element
      const element = elements.find((el) => el.id === draggedElement);
      if (element) {
        updateElement(draggedElement, {
          x: element.x + dx,
          y: element.y + dy,
        });

        setStartPos({ x: e.clientX, y: e.clientY });
      }
    } else if (resizing && selectedElement) {
      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;

      const element = elements.find((el) => el.id === selectedElement);
      if (element) {
        updateElement(selectedElement, {
          width: Math.max(50, startSize.width + dx),
          height: Math.max(50, startSize.height + dy),
        });
      }
    }
  };

  const handleMouseUp = () => {
    setDraggedElement(null);
    setResizing(false);
  };

  const showEmptyIndicator = elements.length === 0;

  return (
    <div
      ref={containerRef}
      className={getContainerClasses()}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {showEmptyIndicator && (
        <div className="absolute inset-0 flex items-center justify-center text-violet-300 pointer-events-none">
          <div className="flex flex-col items-center">
            <Plus className="h-16 w-16" />
            <p className="mt-2 text-lg">Drag elements here</p>
          </div>
        </div>
      )}

      {elements.length > 0 &&
        elements.map((element) => (
          <div
            key={element.id}
            className={`relative ${
              selectedElement === element.id ? "ring-2 ring-violet-500" : ""
            }`}
            style={{
              width: `${element.width}px`,
              height: `${element.height}px`,
              backgroundColor: element.backgroundColor,
              cursor: draggedElement === element.id ? "grabbing" : "grab",
              transform:
                layoutConfig.type === "flexbox"
                  ? "none"
                  : `translate(${element.x}px, ${element.y}px)`,
              zIndex: selectedElement === element.id ? 10 : 1,
            }}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
          >
            <div className="flex items-center justify-center h-full">
              {element.content}
            </div>
            {selectedElement === element.id && (
              <div
                className="absolute bottom-0 right-0 w-4 h-4 bg-violet-500 cursor-se-resize"
                onMouseDown={(e) => handleResizeStart(e, element.id)}
              />
            )}
          </div>
        ))}

      {!showEmptyIndicator && layoutConfig.type === "grid" && (
        <div
          className="absolute inset-0 grid pointer-events-none"
          style={{
            gridTemplateColumns: `repeat(${layoutConfig.gridCols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${layoutConfig.gridRows}, minmax(0, 1fr))`,
            gap: `${layoutConfig.gap ? layoutConfig.gap * 0.25 : 0}rem`,
          }}
        >
          {Array.from({
            length: (layoutConfig.gridCols || 1) * (layoutConfig.gridRows || 1),
          }).map((_, index) => (
            <div
              key={index}
              className="border border-dashed border-violet-200 flex items-center justify-center"
            >
              {elements.length <
                (layoutConfig.gridCols || 1) * (layoutConfig.gridRows || 1) && (
                <Plus className="h-6 w-6 text-violet-200" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
