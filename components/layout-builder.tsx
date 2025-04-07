"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Copy, Download, Plus, Trash } from "lucide-react";
import CanvasArea from "./canvas-area";
import PropertyPanel from "./property-panel";
import CodePreview from "./code-preview";
import { toast } from "@/components/ui/use-toast";

export type LayoutType = "flexbox" | "grid";
export type ElementType = {
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;
  content: string;
  backgroundColor: string;
};

export type LayoutConfig = {
  type: LayoutType;
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  justifyContent?: string;
  alignItems?: string;
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: number;
  gridCols?: number;
  gridRows?: number;
};

export default function LayoutBuilder() {
  const [layoutType, setLayoutType] = useState<LayoutType>("flexbox");
  const [elements, setElements] = useState<ElementType[]>([
    {
      id: "element-1",
      width: 150,
      height: 100,
      x: 0,
      y: 0,
      content: "Element 1",
      backgroundColor: "#8b5cf6",
    },
    {
      id: "element-2",
      width: 150,
      height: 100,
      x: 0,
      y: 0,
      content: "Element 2",
      backgroundColor: "#6366f1",
    },
  ]);

  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
    type: "flexbox",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "nowrap",
    gap: 4,
    gridCols: 3,
    gridRows: 2,
  });

  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const addNewElement = () => {
    const vibrantColors = [
      "#8b5cf6",
      "#6366f1",
      "#ec4899",
      "#14b8a6",
      "#f59e0b",
      "#10b981",
    ];

    const randomColor =
      vibrantColors[Math.floor(Math.random() * vibrantColors.length)];

    const newElement: ElementType = {
      id: `element-${elements.length + 1}`,
      width: 150,
      height: 100,
      x: 0,
      y: 0,
      content: `Element ${elements.length + 1}`,
      backgroundColor: randomColor,
    };
    setElements([...elements, newElement]);
  };

  const removeElement = (id: string) => {
    setElements(elements.filter((el) => el.id !== id));
    if (selectedElement === id) {
      setSelectedElement(null);
    }
  };

  const updateElement = (id: string, updates: Partial<ElementType>) => {
    setElements(
      elements.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied to clipboard",
      description: "You can now paste the code into your project",
    });
  };

  const handleExportCode = (code: string) => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `layout-${layoutType}-${new Date()
      .toISOString()
      .slice(0, 10)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLayoutTypeChange = (type: LayoutType) => {
    setLayoutType(type);
    setLayoutConfig({
      ...layoutConfig,
      type,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue="canvas" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="canvas">Canvas</TabsTrigger>
          <TabsTrigger value="code">Code Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="canvas" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleLayoutTypeChange("flexbox")}
                      className={
                        layoutType === "flexbox"
                          ? "bg-violet-600 text-white hover:bg-violet-700 hover:text-white"
                          : "border-violet-200 hover:border-violet-400 hover:bg-violet-50"
                      }
                    >
                      Flexbox
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleLayoutTypeChange("grid")}
                      className={
                        layoutType === "grid"
                          ? "bg-violet-600 text-white hover:bg-violet-700 hover:text-white"
                          : "border-violet-200 hover:border-violet-400 hover:bg-violet-50"
                      }
                    >
                      Grid
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addNewElement}
                      className="border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 text-emerald-700"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Element
                    </Button>
                    {selectedElement && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeElement(selectedElement)}
                        className="bg-rose-600 hover:bg-rose-700"
                      >
                        <Trash className="h-4 w-4 mr-1" /> Remove Selected
                      </Button>
                    )}
                  </div>
                </div>
                <CanvasArea
                  elements={elements}
                  layoutConfig={layoutConfig}
                  selectedElement={selectedElement}
                  setSelectedElement={setSelectedElement}
                  updateElement={updateElement}
                />
              </Card>
            </div>
            <div className="lg:col-span-1">
              <PropertyPanel
                layoutType={layoutType}
                layoutConfig={layoutConfig}
                setLayoutConfig={setLayoutConfig}
                selectedElement={selectedElement}
                elements={elements}
                updateElement={updateElement}
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="code" className="mt-4">
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                Generated Tailwind CSS Code
              </h3>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const code = generateCode(elements, layoutConfig);
                    handleCopyCode(code);
                  }}
                  className="border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 text-indigo-700"
                >
                  <Copy className="h-4 w-4 mr-1" /> Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const code = generateCode(elements, layoutConfig);
                    handleExportCode(code);
                  }}
                  className="border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 text-indigo-700"
                >
                  <Download className="h-4 w-4 mr-1" /> Export
                </Button>
              </div>
            </div>
            <Separator className="my-4" />
            <CodePreview elements={elements} layoutConfig={layoutConfig} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function generateCode(
  elements: ElementType[],
  layoutConfig: LayoutConfig
): string {
  const containerClasses = getContainerClasses(layoutConfig);

  const elementsCode = elements
    .map((el) => {
      return `  <div class="bg-[${el.backgroundColor}] p-4 text-center">${el.content}</div>`;
    })
    .join("\n");

  return `<div class="${containerClasses}">\n${elementsCode}\n</div>`;
}

function getContainerClasses(config: LayoutConfig): string {
  if (config.type === "flexbox") {
    return `flex ${getFlexDirectionClass(
      config.flexDirection
    )} ${getJustifyContentClass(config.justifyContent)} ${getAlignItemsClass(
      config.alignItems
    )} ${getFlexWrapClass(config.flexWrap)} ${getGapClass(config.gap)}`;
  } else {
    return `grid grid-cols-${config.gridCols} grid-rows-${
      config.gridRows
    } ${getGapClass(config.gap)}`;
  }
}

function getFlexDirectionClass(direction?: string): string {
  switch (direction) {
    case "row":
      return "flex-row";
    case "row-reverse":
      return "flex-row-reverse";
    case "column":
      return "flex-col";
    case "column-reverse":
      return "flex-col-reverse";
    default:
      return "flex-row";
  }
}

function getJustifyContentClass(justify?: string): string {
  switch (justify) {
    case "flex-start":
      return "justify-start";
    case "flex-end":
      return "justify-end";
    case "center":
      return "justify-center";
    case "space-between":
      return "justify-between";
    case "space-around":
      return "justify-around";
    case "space-evenly":
      return "justify-evenly";
    default:
      return "justify-start";
  }
}

function getAlignItemsClass(align?: string): string {
  switch (align) {
    case "flex-start":
      return "items-start";
    case "flex-end":
      return "items-end";
    case "center":
      return "items-center";
    case "stretch":
      return "items-stretch";
    case "baseline":
      return "items-baseline";
    default:
      return "items-start";
  }
}

function getFlexWrapClass(wrap?: string): string {
  switch (wrap) {
    case "nowrap":
      return "flex-nowrap";
    case "wrap":
      return "flex-wrap";
    case "wrap-reverse":
      return "flex-wrap-reverse";
    default:
      return "flex-nowrap";
  }
}

function getGapClass(gap?: number): string {
  return gap ? `gap-${gap}` : "";
}
