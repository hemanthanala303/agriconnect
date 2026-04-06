import { Cloud, CloudRain, Sun, Wind, Droplets } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function WeatherWidget() {
  return (
    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-blue-100">Weather Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-4xl font-bold">24°C</span>
            <span className="text-blue-100">Partly Cloudy</span>
            <span className="text-xs text-blue-200 mt-1">Punjab, India</span>
          </div>
          <Cloud className="h-16 w-16 text-blue-200 opacity-80" />
        </div>
        
        <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="flex flex-col items-center gap-1">
            <Wind className="h-4 w-4 text-blue-200" />
            <span>12 km/h</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Droplets className="h-4 w-4 text-blue-200" />
            <span>45%</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Sun className="h-4 w-4 text-blue-200" />
            <span>UV: 3</span>
          </div>
        </div>

        <div className="mt-4 flex justify-between border-t border-white/20 pt-4 text-xs">
          <div className="flex flex-col items-center">
            <span className="mb-1">Mon</span>
            <CloudRain className="h-4 w-4" />
            <span className="mt-1">22°</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="mb-1">Tue</span>
            <Sun className="h-4 w-4" />
            <span className="mt-1">25°</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="mb-1">Wed</span>
            <Cloud className="h-4 w-4" />
            <span className="mt-1">23°</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="mb-1">Thu</span>
            <Sun className="h-4 w-4" />
            <span className="mt-1">26°</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
