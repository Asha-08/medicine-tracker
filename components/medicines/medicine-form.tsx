import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const medicineSchema = z.object({
  name: z.string().min(1, "Name is required"),
  dosage: z.string().min(1, "Dosage is required"),
  unit: z.string().min(1, "Unit is required"),
  totalStock: z.string().min(1, "Stock is required"),
  threshold: z.string().min(1, "Threshold is required"),
});

export type MedicineFormData = z.infer<typeof medicineSchema>;

interface MedicineFormProps {
  defaultValues?: Partial<MedicineFormData>;
  onSubmit: (data: MedicineFormData) => Promise<void>;
  onCancel: () => void;
  submitting: boolean;
  error: string;
  isEditing: boolean;
}

export default function MedicineForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitting,
  error,
  isEditing,
}: MedicineFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MedicineFormData>({
    resolver: zodResolver(medicineSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
      <div className="space-y-1.5">
        <Label htmlFor="name">Medicine Name</Label>
        <Input
          id="name"
          placeholder="e.g. Paracetamol"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="dosage">Dosage</Label>
          <Input
            id="dosage"
            placeholder="e.g. 500"
            {...register("dosage")}
          />
          {errors.dosage && (
            <p className="text-xs text-destructive">{errors.dosage.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="unit">Unit</Label>
          <Input
            id="unit"
            placeholder="e.g. mg, ml"
            {...register("unit")}
          />
          {errors.unit && (
            <p className="text-xs text-destructive">{errors.unit.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="totalStock">Total Stock</Label>
          <Input
            id="totalStock"
            type="number"
            placeholder="e.g. 30"
            {...register("totalStock")}
          />
          {errors.totalStock && (
            <p className="text-xs text-destructive">
              {errors.totalStock.message}
            </p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="threshold">Alert Threshold</Label>
          <Input
            id="threshold"
            type="number"
            placeholder="e.g. 5"
            {...register("threshold")}
          />
          {errors.threshold && (
            <p className="text-xs text-destructive">
              {errors.threshold.message}
            </p>
          )}
        </div>
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
          {submitting
            ? "Saving..."
            : isEditing
            ? "Save Changes"
            : "Add Medicine"}
        </Button>
      </div>
    </form>
  );
}
