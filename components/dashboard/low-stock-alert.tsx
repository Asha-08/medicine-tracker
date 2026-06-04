import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Package } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { LowStockMedicine } from "@/types/dashboard";

interface LowStockAlertProps {
  medicines: LowStockMedicine[];
}

export default function LowStockAlert({ medicines }: LowStockAlertProps) {
  if (medicines.length === 0) {
    return (
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Package className="w-4 h-4 text-primary" />
            Low Stock Alert
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 space-y-2">
            <Package className="w-8 h-8 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">
              All medicines are well stocked
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-destructive/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-destructive" />
          Low Stock Alert
          <Badge className="bg-destructive/10 text-destructive border-destructive/20 ml-auto">
            {medicines.length} medicine{medicines.length > 1 ? "s" : ""}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {medicines.map((medicine) => (
          <div
            key={medicine.id}
            className="flex items-center justify-between p-3 rounded-xl bg-destructive/5 border border-destructive/20"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {medicine.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {medicine.dosage} {medicine.unit}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-destructive">
                {medicine.totalStock} left
              </p>
              <p className="text-xs text-muted-foreground">
                Threshold: {medicine.threshold}
              </p>
            </div>
          </div>
        ))}
        <Link href="/dashboard/stock" className="block pt-2">
          <Button variant="outline" size="sm" className="w-full gap-2">
            <Package className="w-3 h-3" />
            Add Stock
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
