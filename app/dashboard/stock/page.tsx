"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Swal from "sweetalert2";
import StockCard from "@/components/stock/stock-card";
import StockDialog from "@/components/stock/stock-dialog";
import StockEmptyState from "@/components/stock/stock-empty-state";
import { StockFormData } from "@/components/stock/stock-form";
import { StockLog } from "@/types/stock";
import { Medicine } from "@/types/medicine";

export default function StockPage() {
  const [stockLogs, setStockLogs] = useState<StockLog[]>([]);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchStockLogs = async () => {
    try {
      const res = await fetch("/api/stock");
      const data = await res.json();
      setStockLogs(data);
    } catch {
      console.error("Failed to fetch stock logs");
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
    fetchStockLogs();
    fetchMedicines();
  }, []);

  const handleClose = () => {
    setIsDialogOpen(false);
    setError("");
  };

  const handleSubmit = async (data: StockFormData) => {
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error);
        return;
      }

      handleClose();
      fetchStockLogs();
      fetchMedicines();
    } catch {
      setError("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Delete Stock Log?",
      text: "This will revert the stock change. Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "hsl(0 84% 60%)",
      cancelButtonColor: "hsl(215 16% 47%)",
    });

    if (!result.isConfirmed) return;

    try {
      await fetch(`/api/stock/${id}`, { method: "DELETE" });
      fetchStockLogs();
      fetchMedicines();
      Swal.fire({
        title: "Deleted!",
        text: "Stock log has been deleted and stock reverted.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch {
      console.error("Failed to delete stock log");
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
          <h2 className="text-2xl font-bold text-foreground">Stock</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Track your medicine stock changes
          </p>
        </div>
        {medicines.length > 0 && (
          <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Stock Log
          </Button>
        )}
      </div>

      {/* Content */}
      {stockLogs.length === 0 ? (
        <StockEmptyState
          onAdd={() => setIsDialogOpen(true)}
          hasMedicines={medicines.length > 0}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stockLogs.map((stockLog) => (
            <StockCard
              key={stockLog.id}
              stockLog={stockLog}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Dialog */}
      <StockDialog
        isOpen={isDialogOpen}
        onClose={handleClose}
        medicines={medicines}
        onSubmit={handleSubmit}
        submitting={submitting}
        error={error}
      />
    </div>
  );
}
