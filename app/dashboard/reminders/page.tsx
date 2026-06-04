"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Swal from "sweetalert2";
import ReminderCard from "@/components/reminders/reminder-card";
import ReminderDialog from "@/components/reminders/reminder-dialog";
import ReminderEmptyState from "@/components/reminders/reminder-empty-state";
import { ReminderFormData } from "@/components/reminders/reminder-form";
import { Reminder } from "@/types/reminder";

interface Medicine {
  id: number;
  name: string;
  dosage: string;
  unit: string;
}

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchReminders = async () => {
    try {
      const res = await fetch("/api/reminders");
      const data = await res.json();
      setReminders(data);
    } catch {
      console.error("Failed to fetch reminders");
    } finally {
      setLoading(false);
    }
  };

  const fetchMedicines = async () => {
    try {
      const res = await fetch("/api/medicines");
      const data = await res.json();
      setMedicines(data);
    } catch {
      console.error("Failed to fetch medicines");
    }
  };

  useEffect(() => {
    fetchReminders();
    fetchMedicines();
  }, []);

  const openAddDialog = () => {
    setEditingReminder(null);
    setError("");
    setIsDialogOpen(true);
  };

  const openEditDialog = (reminder: Reminder) => {
    setEditingReminder(reminder);
    setError("");
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setEditingReminder(null);
    setError("");
  };

  const handleSubmit = async (data: ReminderFormData) => {
    setSubmitting(true);
    setError("");

    try {
      const url = editingReminder
        ? `/api/reminders/${editingReminder.id}`
        : "/api/reminders";
      const method = editingReminder ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error);
        return;
      }

      handleClose();
      fetchReminders();
    } catch {
      setError("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleTaken = async (timeId: number, isTaken: boolean) => {
    try {
      await fetch(`/api/reminders/${timeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isTaken: !isTaken }),
      });
      fetchReminders();
    } catch {
      console.error("Failed to toggle reminder");
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Delete Reminder?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "hsl(0 84% 60%)",
      cancelButtonColor: "hsl(215 16% 47%)",
    });

    if (!result.isConfirmed) return;

    try {
      await fetch(`/api/reminders/${id}`, { method: "DELETE" });
      fetchReminders();
      Swal.fire({
        title: "Deleted!",
        text: "Reminder has been deleted.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch {
      console.error("Failed to delete reminder");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reminders</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your medicine reminders
          </p>
        </div>
        {medicines.length > 0 && (
          <Button onClick={openAddDialog} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Reminder
          </Button>
        )}
      </div>

      {/* Content */}
      {reminders.length === 0 ? (
        <ReminderEmptyState
          onAdd={openAddDialog}
          hasMedicines={medicines.length > 0}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reminders.map((reminder) => (
            <ReminderCard
              key={reminder.id}
              reminder={reminder}
              onEdit={openEditDialog}
              onDelete={handleDelete}
              onToggleTaken={handleToggleTaken}
            />
          ))}
        </div>
      )}

      {/* Dialog */}
      <ReminderDialog
        isOpen={isDialogOpen}
        onClose={handleClose}
        editingReminder={editingReminder}
        medicines={medicines}
        onSubmit={handleSubmit}
        submitting={submitting}
        error={error}
      />
    </div>
  );
}
