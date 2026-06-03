"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import MedicineCard from "@/components/medicines/medicine-card";
import MedicineDialog from "@/components/medicines/medicine-dialog";
import EmptyState from "@/components/medicines/empty-state";
import { MedicineFormData } from "@/components/medicines/medicine-form";
import { Medicine } from "@/types/medicine";
import Swal from "sweetalert2";


export default function MedicinesPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchMedicines = async () => {
    try {
      const res = await fetch("/api/medicines");
      const data = await res.json();
      setMedicines(data);
    } catch {
      console.error("Failed to fetch medicines");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const openAddDialog = () => {
    setEditingMedicine(null);
    setError("");
    setIsDialogOpen(true);
  };

  const openEditDialog = (medicine: Medicine) => {
    setEditingMedicine(medicine);
    setError("");
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setEditingMedicine(null);
    setError("");
  };

  const handleSubmit = async (data: MedicineFormData) => {
    setSubmitting(true);
    setError("");

    try {
      const url = editingMedicine
        ? `/api/medicines/${editingMedicine.id}`
        : "/api/medicines";
      const method = editingMedicine ? "PUT" : "POST";

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
      fetchMedicines();
    } catch {
      setError("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Delete Medicine?",
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
      await fetch(`/api/medicines/${id}`, { method: "DELETE" });
      fetchMedicines();
      Swal.fire({
        title: "Deleted!",
        text: "Medicine has been deleted.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch {
      console.error("Failed to delete medicine");
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
          <h2 className="text-2xl font-bold text-foreground">Medicines</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your medicines and stock levels
          </p>
        </div>
        <Button onClick={openAddDialog} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Medicine
        </Button>
      </div>

      {/* Content */}
      {medicines.length === 0 ? (
        <EmptyState onAdd={openAddDialog} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {medicines.map((medicine) => (
            <MedicineCard
              key={medicine.id}
              medicine={medicine}
              onEdit={openEditDialog}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Dialog */}
      <MedicineDialog
        isOpen={isDialogOpen}
        onClose={handleClose}
        editingMedicine={editingMedicine}
        onSubmit={handleSubmit}
        submitting={submitting}
        error={error}
      />
    </div>
  );
}