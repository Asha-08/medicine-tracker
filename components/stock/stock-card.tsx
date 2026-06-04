import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { StockLog } from "@/types/stock";

interface StockCardProps {
  stockLog: StockLog;
  onDelete: (id: number) => void;
}

export default function StockCard({ stockLog, onDelete }: StockCardProps) {
  const isIN = stockLog.type === "IN";

  const formattedDate = new Date(stockLog.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <Card className="border-border hover:shadow-md transition-shadow">
      <CardContent className="p-5 space-y-4">
        {/* Top */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isIN ? "bg-green-500/10" : "bg-destructive/10"
              }`}
            >
              <Package
                className={`w-5 h-5 ${
                  isIN ? "text-green-500" : "text-destructive"
                }`}
              />
            </div>
            <div>
              <p className="font-semibold text-foreground">
                {stockLog.medicine.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {stockLog.medicine.dosage} {stockLog.medicine.unit}
              </p>
            </div>
          </div>
          <Badge
            className={
              isIN
                ? "bg-green-500/10 text-green-500 border-green-500/20"
                : "bg-destructive/10 text-destructive border-destructive/20"
            }
          >
            {isIN ? (
              <ArrowUp className="w-3 h-3 mr-1" />
            ) : (
              <ArrowDown className="w-3 h-3 mr-1" />
            )}
            {isIN ? "Stock In" : "Stock Out"}
          </Badge>
        </div>

        {/* Info */}
        <div className="bg-muted/50 rounded-xl p-3 space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Quantity</span>
            <span
              className={`font-semibold ${
                isIN ? "text-green-500" : "text-destructive"
              }`}
            >
              {isIN ? "+" : "-"}
              {stockLog.quantity} {stockLog.medicine.unit}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Current Stock</span>
            <span className="font-medium text-foreground">
              {stockLog.medicine.totalStock} {stockLog.medicine.unit}
            </span>
          </div>
          {stockLog.note && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Note</span>
              <span className="font-medium text-foreground">
                {stockLog.note}
              </span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Date</span>
            <span className="font-medium text-foreground">{formattedDate}</span>
          </div>
        </div>

        {/* Actions */}
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-1 hover:text-destructive hover:border-destructive"
          onClick={() => onDelete(stockLog.id)}
        >
          <Trash2 className="w-3 h-3" />
          Delete
        </Button>
      </CardContent>
    </Card>
  );
}
