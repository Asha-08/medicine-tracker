import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ArrowUp, ArrowDown } from "lucide-react";

import { RecentStock } from "@/types/dashboard";

interface RecentStockLogProps {
  stockLogs: RecentStock[];
}

export default function RecentStockLog({ stockLogs }: RecentStockLogProps) {
  if (stockLogs.length === 0) {
    return (
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Recent Stock Changes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 space-y-2">
            <TrendingUp className="w-8 h-8 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">
              No stock changes yet
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          Recent Stock Changes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {stockLogs.map((log) => {
          const isIN = log.type === "IN";
          const formattedDate = new Date(log.createdAt).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }
          );

          return (
            <div
              key={log.id}
              className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isIN ? "bg-green-500/10" : "bg-destructive/10"
                  }`}
                >
                  {isIN ? (
                    <ArrowUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-destructive" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {log.medicine.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{formattedDate}</p>
                </div>
              </div>
              <div className="text-right space-y-1">
                <Badge
                  className={
                    isIN
                      ? "bg-green-500/10 text-green-500 border-green-500/20"
                      : "bg-destructive/10 text-destructive border-destructive/20"
                  }
                >
                  {isIN ? "+" : "-"}
                  {log.quantity} {log.medicine.unit}
                </Badge>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
