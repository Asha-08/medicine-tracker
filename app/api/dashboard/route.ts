import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);

    // all data 
    const [medicines, reminders, recentStockLogs] = await Promise.all([
      // all medicines
      prisma.medicine.findMany({
        where: { userId },
      }),

      // all reminders with times
      prisma.reminderSchedule.findMany({
        where: {
          medicine: { userId },
        },
        include: {
          times: true,
          medicine: {
            select: {
              name: true,
              dosage: true,
              unit: true,
            },
          },
        },
      }),

      // latest 5 stock log
      prisma.stockLog.findMany({
        where: {
          medicine: { userId },
        },
        include: {
          medicine: {
            select: {
              name: true,
              dosage: true,
              unit: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

    // Low stock medicines
    const lowStockMedicines = medicines.filter(
      (m) => m.totalStock <= m.threshold
    );

    // Today's reminders
    const now = new Date();
    const todaysReminders = reminders.flatMap((reminder) =>
      reminder.times.map((time) => {
        const [hours, minutes] = time.time.split(":").map(Number);
        const reminderTime = new Date();
        reminderTime.setHours(hours, minutes, 0, 0);

        return {
          id: time.id,
          medicineName: reminder.medicine.name,
          dosage: reminder.medicine.dosage,
          unit: reminder.medicine.unit,
          time: time.time,
          isTaken: time.isTaken,
          isPending: !time.isTaken && now > reminderTime,
          isUpcoming: !time.isTaken && now <= reminderTime,
        };
      })
    );

    return NextResponse.json({
      totalMedicines: medicines.length,
      lowStockCount: lowStockMedicines.length,
      lowStockMedicines,
      todaysReminders,
      takenCount: todaysReminders.filter((r) => r.isTaken).length,
      pendingCount: todaysReminders.filter((r) => r.isPending).length,
      upcomingCount: todaysReminders.filter((r) => r.isUpcoming).length,
      recentStockLogs,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
