import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";

interface StockEmptyStateProps {
  onAdd: () => void;
  hasMedicines: boolean;
}

export default function StockEmptyState({
  onAdd,
  hasMedicines,
}: StockEmptyStateProps) {
  if (!hasMedicines) {
    return (
      <Card className="border-dashed border-2">
        <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
            <Package className="w-8 h-8 text-primary" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-foreground">No medicines found</p>
            <p className="text-sm text-muted-foreground mt-1">
              You need to add a medicine before logging stock
            </p>
          </div>
          <Link href="/dashboard/medicines">
            <Button className="gap-2">
              <ArrowRight className="w-4 h-4" />
              Go to Medicines
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-dashed border-2">
      <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
          <Package className="w-8 h-8 text-primary" />
        </div>
        <div className="text-center">
          <p className="font-semibold text-foreground">No stock logs yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Add your first stock log to get started
          </p>
        </div>
        <Button onClick={onAdd} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Stock Log
        </Button>
      </CardContent>
    </Card>
  );
}
