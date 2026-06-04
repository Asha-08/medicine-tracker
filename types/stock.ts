export interface StockLog {
  id: number;
  medicineId: number;
  type: string;
  quantity: number;
  note: string | null;
  createdAt: string;
  medicine: {
    id: number;
    name: string;
    dosage: string;
    unit: string;
    totalStock: number;
  };
}
