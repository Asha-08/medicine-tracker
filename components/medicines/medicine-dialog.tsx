import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MedicineForm, { MedicineFormData } from "./medicine-form";
import { Medicine } from "@/types/medicine";



interface MedicineDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editingMedicine: Medicine | null;
  onSubmit: (data: MedicineFormData) => Promise<void>;
  submitting: boolean;
  error: string;
}

export default function MedicineDialog({
  isOpen,
  onClose,
  editingMedicine,
  onSubmit,
  submitting,
  error,
}: MedicineDialogProps) {
  const defaultValues = editingMedicine
  ? {
      name: editingMedicine.name,
      dosage: editingMedicine.dosage,
      unit: editingMedicine.unit,
      totalStock: String(editingMedicine.totalStock),
      threshold: String(editingMedicine.threshold),
      doseAmount: String(editingMedicine.doseAmount),
    }
  : undefined;
  

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingMedicine ? "Edit Medicine" : "Add New Medicine"}
          </DialogTitle>
        </DialogHeader>
        <MedicineForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          onCancel={onClose}
          submitting={submitting}
          error={error}
          isEditing={!!editingMedicine}
        />
      </DialogContent>
    </Dialog>
  );
}
