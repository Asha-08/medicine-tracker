import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pill, Pencil, Trash2, AlertTriangle } from "lucide-react";
import { Medicine } from "@/types/medicine";



interface MedicineCardProps {
  medicine: Medicine;
  onEdit: (medicine: Medicine) => void;
  onDelete: (id: number) => void;
}

export default function MedicineCard({
  medicine,
  onEdit,
  onDelete,
}: MedicineCardProps) {
  const isLowStock = medicine.totalStock <= medicine.threshold;

  return (
    <Card
      className={`border transition-shadow hover:shadow-md ${
        isLowStock ? "border-destructive/30" : "border-border"
      }`}
    >
      <CardContent className="p-5 space-y-4">
        {/* Top */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Pill className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{medicine.name}</p>
              <p className="text-xs text-muted-foreground">
                {medicine.dosage} {medicine.unit}
              </p>
            </div>
          </div>
          {isLowStock && (
            <Badge variant="destructive" className="gap-1 text-xs">
              <AlertTriangle className="w-3 h-3" />
              Low Stock
            </Badge>
          )}
        </div>

        {/* Stock info */}
        <div className="bg-muted/50 rounded-xl p-3 space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Current Stock</span>
            <span className="font-semibold text-foreground">
              {medicine.totalStock} {medicine.unit}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Alert Threshold</span>
            <span className="font-medium text-foreground">
              {medicine.threshold} {medicine.unit}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-1"
            onClick={() => onEdit(medicine)}
          >
            <Pencil className="w-3 h-3" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-1 hover:text-destructive hover:border-destructive"
            onClick={() => onDelete(medicine.id)}
          >
            <Trash2 className="w-3 h-3" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
