export interface TodayReminder {
  id: number;
  medicineName: string;
  dosage: string;
  unit: string;
  time: string;
  isTaken: boolean;
  isPending: boolean;
  isUpcoming: boolean;
}

export interface LowStockMedicine {
  id: number;
  name: string;
  dosage: string;
  unit: string;
  totalStock: number;
  threshold: number;
}

export interface RecentStock {
  id: number;
  type: string;
  quantity: number;
  note: string | null;
  createdAt: string;
  medicine: {
    name: string;
    dosage: string;
    unit: string;
  };
}

export interface DashboardData {
  totalMedicines: number;
  lowStockCount: number;
  lowStockMedicines: LowStockMedicine[];
  todaysReminders: TodayReminder[];
  takenCount: number;
  pendingCount: number;
  upcomingCount: number;
  recentStockLogs: RecentStock[];
}
