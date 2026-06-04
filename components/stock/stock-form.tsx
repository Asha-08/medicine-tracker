import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const stockSchema = z.object({
  medicineId: z.string().min(1, "Please select a medicine"),
  type: z.string().min(1, "Please select a type"),
  quantity: z.string().min(1, "Quantity is required"),
  note: z.string().optional(),
});

export type StockFormData = z.infer<typeof stockSchema>;

import { Medicine } from "@/types/medicine";

interface StockFormProps {
  medicines: Medicine[];
  onSubmit: (data: StockFormData) => Promise<void>;
  onCancel: () => void;
  submitting: boolean;
  error: string;
}

export default function StockForm({
  medicines,
  onSubmit,
  onCancel,
  submitting,
  error,
}: StockFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StockFormData>({
    resolver: zodResolver(stockSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
      {/* Medicine Select */}
      <div className="space-y-1.5">
        <Label htmlFor="medicineId">Medicine</Label>
        <select
          id="medicineId"
          className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          {...register("medicineId")}
        >
          <option value="">Select a medicine</option>
          {medicines.map((medicine) => (
            <option key={medicine.id} value={String(medicine.id)}>
              {medicine.name} — {medicine.dosage} {medicine.unit} (Stock:{" "}
              {medicine.totalStock})
            </option>
          ))}
        </select>
        {errors.medicineId && (
          <p className="text-xs text-destructive">
            {errors.medicineId.message}
          </p>
        )}
      </div>

      {/* Type */}
      <div className="space-y-1.5">
        <Label htmlFor="type">Type</Label>
        <select
          id="type"
          className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          {...register("type")}
        >
          <option value="">Select type</option>
          <option value="IN">Stock In (Bought)</option>
          <option value="OUT">Stock Out (Used)</option>
        </select>
        {errors.type && (
          <p className="text-xs text-destructive">{errors.type.message}</p>
        )}
      </div>

      {/* Quantity */}
      <div className="space-y-1.5">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          type="number"
          min="1"
          placeholder="e.g. 10"
          {...register("quantity")}
        />
        {errors.quantity && (
          <p className="text-xs text-destructive">{errors.quantity.message}</p>
        )}
      </div>

      {/* Note */}
      <div className="space-y-1.5">
        <Label htmlFor="note">Note (Optional)</Label>
        <Input
          id="note"
          type="text"
          placeholder="e.g. Bought from pharmacy"
          {...register("note")}
        />
      </div>

      {error && (
        <p className="text-sm text-destructive text-center">{error}</p>
      )}

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" className="flex-1" disabled={submitting}>
          {submitting ? "Saving..." : "Add Stock Log"}
        </Button>
      </div>
    </form>
  );
}
