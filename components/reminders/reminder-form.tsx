import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

const reminderSchema = z.object({
  medicineId: z.string().min(1, "Please select a medicine"),
  frequency: z.string().min(1, "Frequency is required"),
});

export type ReminderFormData = z.infer<typeof reminderSchema> & {
  times: string[];
};

interface Medicine {
  id: number;
  name: string;
  dosage: string;
  unit: string;
}

interface ReminderFormProps {
  medicines: Medicine[];
  defaultValues?: Partial<ReminderFormData>;
  onSubmit: (data: ReminderFormData) => Promise<void>;
  onCancel: () => void;
  submitting: boolean;
  error: string;
  isEditing: boolean;
}

export default function ReminderForm({
  medicines,
  defaultValues,
  onSubmit,
  onCancel,
  submitting,
  error,
  isEditing,
}: ReminderFormProps) {
  const [times, setTimes] = useState<string[]>(
    defaultValues?.times ?? [""]
  );
  const [timesError, setTimesError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof reminderSchema>>({
    resolver: zodResolver(reminderSchema),
    defaultValues: {
      medicineId: defaultValues?.medicineId ?? "",
      frequency: defaultValues?.frequency ?? "",
    },
  });

  const addTime = () => {
    setTimes([...times, ""]);
  };

  const removeTime = (index: number) => {
    if (times.length === 1) return;
    setTimes(times.filter((_, i) => i !== index));
  };

  const updateTime = (index: number, value: string) => {
    const updated = [...times];
    updated[index] = value;
    setTimes(updated);
  };

  const handleFormSubmit = async (data: z.infer<typeof reminderSchema>) => {
    const validTimes = times.filter((t) => t.trim() !== "");
    if (validTimes.length === 0) {
      setTimesError("At least one time is required");
      return;
    }
    setTimesError("");
    await onSubmit({ ...data, times: validTimes });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 pt-2">
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
              {medicine.name} — {medicine.dosage} {medicine.unit}
            </option>
          ))}
        </select>
        {errors.medicineId && (
          <p className="text-xs text-destructive">
            {errors.medicineId.message}
          </p>
        )}
      </div>

      {/* Frequency */}
      <div className="space-y-1.5">
        <Label htmlFor="frequency">Frequency</Label>
        <select
          id="frequency"
          className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          {...register("frequency")}
        >
          <option value="">Select frequency</option>
          <option value="Daily">Daily</option>
          <option value="Every 2 days">Every 2 days</option>
          <option value="Every 3 days">Every 3 days</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
        {errors.frequency && (
          <p className="text-xs text-destructive">{errors.frequency.message}</p>
        )}
      </div>

      {/* Time Slots */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Time Slots</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1 h-7 text-xs"
            onClick={addTime}
          >
            <Plus className="w-3 h-3" />
            Add Time
          </Button>
        </div>

        <div className="space-y-2">
          {times.map((time, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                type="time"
                value={time}
                onChange={(e) => updateTime(index, e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="hover:text-destructive hover:border-destructive"
                onClick={() => removeTime(index)}
                disabled={times.length === 1}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>

        {timesError && (
          <p className="text-xs text-destructive">{timesError}</p>
        )}
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
            : "Add Reminder"}
        </Button>
      </div>
    </form>
  );
}
