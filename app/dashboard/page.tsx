"use client";

import { useState, useEffect } from "react";
import { Pill, Bell, AlertTriangle, CheckCircle } from "lucide-react";
import StatsCard from "@/components/dashboard/stats-card";
import LowStockAlert from "@/components/dashboard/low-stock-alert";
import RecentStockLog from "@/components/dashboard/recent-stock-log";

import { DashboardData } from "@/types/dashboard";
import TodaysReminders from "@/components/dashboard/todays-reminder";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();


  const fetchDashboard = async () => {
    try {
      const res = await fetch("/api/dashboard");
      const result = await res.json();
      setData(result);
    } catch {
      console.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Welcome, {session?.user?.name}!
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Here is your medicine summary for today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Medicines"
          value={data.totalMedicines}
          subtitle="Medicines being tracked"
          icon={Pill}
          color="default"
        />
        <StatsCard
          title="Taken Today"
          value={data.takenCount}
          subtitle="Doses taken today"
          icon={CheckCircle}
          color="success"
        />
        <StatsCard
          title="Pending"
          value={data.pendingCount}
          subtitle="Missed doses today"
          icon={Bell}
          color="warning"
        />
        <StatsCard
          title="Low Stock"
          value={data.lowStockCount}
          subtitle="Medicines running low"
          icon={AlertTriangle}
          color="danger"
        />
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TodaysReminders reminders={data.todaysReminders} />
        <LowStockAlert medicines={data.lowStockMedicines} />
      </div>

      {/* Recent Stock */}
      <RecentStockLog stockLogs={data.recentStockLogs} />
    </div>
  );
}
