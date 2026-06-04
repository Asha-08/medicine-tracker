export interface ReminderTime {
  id: number;
  reminderId: number;
  time: string;
  isTaken: boolean;
  date: string;
}

export interface Reminder {
  id: number;
  medicineId: number;
  frequency: string;
  createdAt: string;
  medicine: {
    id: number;
    name: string;
    dosage: string;
    unit: string;
  };
  times: ReminderTime[];
}
