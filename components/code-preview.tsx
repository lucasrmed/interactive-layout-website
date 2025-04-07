"use client";

import type { ElementType, LayoutConfig } from "./layout-builder";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CodePreviewProps {
  elements: ElementType[];
  layoutConfig: LayoutConfig;
}

export default function CodePreview({
  elements,
  layoutConfig,
}: CodePreviewProps) {
  const [htmlCode, setHtmlCode] = useState("");
  const [tailwindCode, setTailwindCode] = useState("");
  const [cssCode, setCssCode] = useState("");

  useEffect(() => {
    generateCode();
  }, [elements, layoutConfig]);

  const generateCode = () => {
    const containerClasses = getContainerClasses();

    let html = `<div class="${containerClasses}">\n`;

    elements.forEach((element) => {
      html += `  <div class="bg-[${element.backgroundColor}] p-4 text-center w-[${element.width}px] h-[${element.height}px]">${element.content}</div>\n`;
    });

    html += `</div>`;

    setHtmlCode(html);

    setTailwindCode(
      `/* Container */\n${containerClasses}\n\n/* Elements */\nbg-[color] p-4 text-center w-[width] h-[height]`
    );

    let css = `.container {\n`;

    if (layoutConfig.type === "flexbox") {
      css += `  display: flex;\n`;

      if (layoutConfig.flexDirection) {
        css += `  flex-direction: ${layoutConfig.flexDirection};\n`;
      }

      if (layoutConfig.justifyContent) {
        css += `  justify-content: ${layoutConfig.justifyContent};\n`;
      }

      if (layoutConfig.alignItems) {
        css += `  align-items: ${layoutConfig.alignItems};\n`;
      }

      if (layoutConfig.flexWrap) {
        css += `  flex-wrap: ${layoutConfig.flexWrap};\n`;
      }

      if (layoutConfig.gap) {
        css += `  gap: ${layoutConfig.gap * 0.25}rem;\n`;
      }
    } else if (layoutConfig.type === "grid") {
      css += `  display: grid;\n`;

      if (layoutConfig.gridCols) {
        css += `  grid-template-columns: repeat(${layoutConfig.gridCols}, minmax(0, 1fr));\n`;
      }

      if (layoutConfig.gridRows) {
        css += `  grid-template-rows: repeat(${layoutConfig.gridRows}, minmax(0, 1fr));\n`;
      }

      if (layoutConfig.gap) {
        css += `  gap: ${layoutConfig.gap * 0.25}rem;\n`;
      }
    }

    css += `}\n\n.element {\n  padding: 1rem;\n  text-align: center;\n  width: [element width]px;\n  height: [element height]px;\n}`;

    setCssCode(css);
  };

  const getContainerClasses = () => {
    let classes = "";

    if (layoutConfig.type === "flexbox") {
      classes += "flex";

      // Add flex direction
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

      // Add flex wrap
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
      classes += "grid";

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

  return (
    <div>
      <Tabs defaultValue="html">
        <TabsList className="w-full bg-violet-100">
          <TabsTrigger
            value="html"
            className="data-[state=active]:bg-violet-600 data-[state=active]:text-white"
          >
            Tailwind
          </TabsTrigger>
          <TabsTrigger
            value="tailwind"
            className="data-[state=active]:bg-violet-600 data-[state=active]:text-white"
          >
            Tailwind Classes
          </TabsTrigger>
          <TabsTrigger
            value="css"
            className="data-[state=active]:bg-violet-600 data-[state=active]:text-white"
          >
            Pure CSS
          </TabsTrigger>
        </TabsList>
        <TabsContent value="html" className="mt-4">
          <pre className="p-4 bg-gray-900 text-gray-100 rounded-md overflow-auto max-h-96 font-mono text-sm">
            <code>{htmlCode}</code>
          </pre>
        </TabsContent>
        <TabsContent value="tailwind" className="mt-4">
          <pre className="p-4 bg-gray-900 text-gray-100 rounded-md overflow-auto max-h-96 font-mono text-sm">
            <code>
              {"/* Container */\n"}
              {tailwindCode}
              {"\n\n/* Elements */\n"}
              {"bg-[color] p-4 text-center w-[width] h-[height]"}
            </code>
          </pre>
        </TabsContent>
        <TabsContent value="css" className="mt-4">
          <pre className="p-4 bg-gray-900 text-gray-100 rounded-md overflow-auto max-h-96 font-mono text-sm">
            <code>{cssCode}</code>
          </pre>
        </TabsContent>
      </Tabs>
    </div>
  );
}
