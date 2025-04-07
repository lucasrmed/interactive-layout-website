"use client"

import type { ElementType, LayoutConfig, LayoutType } from "./layout-builder"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PropertyPanelProps {
  layoutType: LayoutType
  layoutConfig: LayoutConfig
  setLayoutConfig: (config: LayoutConfig) => void
  selectedElement: string | null
  elements: ElementType[]
  updateElement: (id: string, updates: Partial<ElementType>) => void
}

export default function PropertyPanel({
  layoutType,
  layoutConfig,
  setLayoutConfig,
  selectedElement,
  elements,
  updateElement,
}: PropertyPanelProps) {
  const selectedElementData = selectedElement ? elements.find((el) => el.id === selectedElement) : null

  return (
    <Card className="bg-white shadow-md border-violet-100">
      <CardHeader className="bg-gradient-to-r from-violet-50 to-indigo-50 border-b border-violet-100">
        <CardTitle className="text-violet-800">Properties</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="layout">
          <TabsList className="grid w-full grid-cols-2 bg-violet-100">
            <TabsTrigger value="layout" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white">
              Layout
            </TabsTrigger>
            <TabsTrigger
              value="element"
              disabled={!selectedElement}
              className="data-[state=active]:bg-violet-600 data-[state=active]:text-white"
            >
              Element
            </TabsTrigger>
          </TabsList>
          <TabsContent value="layout" className="space-y-4 pt-4">
            {layoutType === "flexbox" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="flexDirection">Flex Direction</Label>
                  <Select
                    value={layoutConfig.flexDirection}
                    onValueChange={(value) =>
                      setLayoutConfig({
                        ...layoutConfig,
                        flexDirection: value as any,
                      })
                    }
                  >
                    <SelectTrigger id="flexDirection">
                      <SelectValue placeholder="Select direction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="row">Row</SelectItem>
                      <SelectItem value="row-reverse">Row Reverse</SelectItem>
                      <SelectItem value="column">Column</SelectItem>
                      <SelectItem value="column-reverse">Column Reverse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="justifyContent">Justify Content</Label>
                  <Select
                    value={layoutConfig.justifyContent}
                    onValueChange={(value) =>
                      setLayoutConfig({
                        ...layoutConfig,
                        justifyContent: value,
                      })
                    }
                  >
                    <SelectTrigger id="justifyContent">
                      <SelectValue placeholder="Select justify content" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flex-start">Flex Start</SelectItem>
                      <SelectItem value="flex-end">Flex End</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="space-between">Space Between</SelectItem>
                      <SelectItem value="space-around">Space Around</SelectItem>
                      <SelectItem value="space-evenly">Space Evenly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alignItems">Align Items</Label>
                  <Select
                    value={layoutConfig.alignItems}
                    onValueChange={(value) =>
                      setLayoutConfig({
                        ...layoutConfig,
                        alignItems: value,
                      })
                    }
                  >
                    <SelectTrigger id="alignItems">
                      <SelectValue placeholder="Select align items" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flex-start">Flex Start</SelectItem>
                      <SelectItem value="flex-end">Flex End</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="stretch">Stretch</SelectItem>
                      <SelectItem value="baseline">Baseline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="flexWrap">Flex Wrap</Label>
                  <Select
                    value={layoutConfig.flexWrap}
                    onValueChange={(value) =>
                      setLayoutConfig({
                        ...layoutConfig,
                        flexWrap: value as any,
                      })
                    }
                  >
                    <SelectTrigger id="flexWrap">
                      <SelectValue placeholder="Select flex wrap" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nowrap">No Wrap</SelectItem>
                      <SelectItem value="wrap">Wrap</SelectItem>
                      <SelectItem value="wrap-reverse">Wrap Reverse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {layoutType === "grid" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="gridCols">Grid Columns</Label>
                  <Select
                    value={layoutConfig.gridCols?.toString()}
                    onValueChange={(value) =>
                      setLayoutConfig({
                        ...layoutConfig,
                        gridCols: Number.parseInt(value),
                      })
                    }
                  >
                    <SelectTrigger id="gridCols">
                      <SelectValue placeholder="Select columns" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gridRows">Grid Rows</Label>
                  <Select
                    value={layoutConfig.gridRows?.toString()}
                    onValueChange={(value) =>
                      setLayoutConfig({
                        ...layoutConfig,
                        gridRows: Number.parseInt(value),
                      })
                    }
                  >
                    <SelectTrigger id="gridRows">
                      <SelectValue placeholder="Select rows" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="gap">Gap</Label>
              <Select
                value={layoutConfig.gap?.toString()}
                onValueChange={(value) =>
                  setLayoutConfig({
                    ...layoutConfig,
                    gap: Number.parseInt(value),
                  })
                }
              >
                <SelectTrigger id="gap">
                  <SelectValue placeholder="Select gap" />
                </SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 4, 6, 8].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="element" className="space-y-4 pt-4">
            {selectedElementData && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="elementContent">Content</Label>
                  <Input
                    id="elementContent"
                    value={selectedElementData.content}
                    onChange={(e) =>
                      updateElement(selectedElement!, {
                        content: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="elementWidth">Width (px)</Label>
                  <Input
                    id="elementWidth"
                    type="number"
                    value={selectedElementData.width}
                    onChange={(e) =>
                      updateElement(selectedElement!, {
                        width: Number.parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="elementHeight">Height (px)</Label>
                  <Input
                    id="elementHeight"
                    type="number"
                    value={selectedElementData.height}
                    onChange={(e) =>
                      updateElement(selectedElement!, {
                        height: Number.parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="elementColor">Background Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="elementColor"
                      type="color"
                      value={selectedElementData.backgroundColor}
                      onChange={(e) =>
                        updateElement(selectedElement!, {
                          backgroundColor: e.target.value,
                        })
                      }
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={selectedElementData.backgroundColor}
                      onChange={(e) =>
                        updateElement(selectedElement!, {
                          backgroundColor: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

