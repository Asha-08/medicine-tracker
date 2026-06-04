import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ReminderForm, { ReminderFormData } from "./reminder-form";
import { Reminder } from "@/types/reminder";

interface Medicine {
  id: number;
  name: string;
  dosage: string;
  unit: string;
}

interface ReminderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  editingReminder: Reminder | null;
  medicines: Medicine[];
  onSubmit: (data: ReminderFormData) => Promise<void>;
  submitting: boolean;
  error: string;
}

export default function ReminderDialog({
  isOpen,
  onClose,
  editingReminder,
  medicines,
  onSubmit,
  submitting,
  error,
}: ReminderDialogProps) {
  const defaultValues = editingReminder
    ? {
        medicineId: String(editingReminder.medicineId),
        frequency: editingReminder.frequency,
        times: editingReminder.times.map((t) => t.time),
      }
    : undefined;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingReminder ? "Edit Reminder" : "Add New Reminder"}
          </DialogTitle>
        </DialogHeader>
        <ReminderForm
          medicines={medicines}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          onCancel={onClose}
          submitting={submitting}
          error={error}
          isEditing={!!editingReminder}
        />
      </DialogContent>
    </Dialog>
  );
}
