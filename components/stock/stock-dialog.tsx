import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StockForm, { StockFormData } from "./stock-form";

import { Medicine } from "@/types/medicine";

interface StockDialogProps {
  isOpen: boolean;
  onClose: () => void;
  medicines: Medicine[];
  onSubmit: (data: StockFormData) => Promise<void>;
  submitting: boolean;
  error: string;
}

export default function StockDialog({
  isOpen,
  onClose,
  medicines,
  onSubmit,
  submitting,
  error,
}: StockDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Stock Log</DialogTitle>
        </DialogHeader>
        <StockForm
          medicines={medicines}
          onSubmit={onSubmit}
          onCancel={onClose}
          submitting={submitting}
          error={error}
        />
      </DialogContent>
    </Dialog>
  );
}
