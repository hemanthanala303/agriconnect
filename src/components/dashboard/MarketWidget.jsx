import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const marketData = [
  { crop: "Wheat", price: "₹2,125/q", change: "+2.5%", trend: "up" },
  { crop: "Rice (Basmati)", price: "₹3,850/q", change: "-1.2%", trend: "down" },
  { crop: "Maize", price: "₹1,980/q", change: "+0.8%", trend: "up" },
  { crop: "Cotton", price: "₹6,200/q", change: "+1.5%", trend: "up" },
];

export function MarketWidget() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Market Prices</CardTitle>
        <Button variant="ghost" size="sm" className="h-8 text-xs">
          View All <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {marketData.map((item, index) => (
            <div key={index} className="flex items-center justify-between border-b border-stone-100 pb-2 last:border-0 last:pb-0">
              <div>
                <div className="font-medium text-stone-900">{item.crop}</div>
                <div className="text-xs text-stone-500">Local Mandi</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-stone-900">{item.price}</div>
                <div className={`flex items-center justify-end text-xs ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {item.trend === 'up' ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
                  {item.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
