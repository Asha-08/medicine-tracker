import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/db";

// GET — all reminders
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reminders = await prisma.reminderSchedule.findMany({
      where: {
        medicine: {
          userId: parseInt(session.user.id),
        },
      },
      include: {
        medicine: {
          select: {
            id: true,
            name: true,
            dosage: true,
            unit: true,
          },
        },
        times: {
          orderBy: { time: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reminders);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// POST — new reminder 
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { medicineId, frequency, times } = await req.json();

    if (!medicineId || !frequency || !times || times.length === 0) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Verify medicine belongs to user
    const medicine = await prisma.medicine.findUnique({
      where: {
        id: parseInt(medicineId),
        userId: parseInt(session.user.id),
      },
    });

    if (!medicine) {
      return NextResponse.json(
        { error: "Medicine not found" },
        { status: 404 }
      );
    }

    const reminder = await prisma.reminderSchedule.create({
      data: {
        medicineId: parseInt(medicineId),
        frequency,
        times: {
          create: times.map((time: string) => ({ time })),
        },
      },
      include: {
        medicine: {
          select: {
            id: true,
            name: true,
            dosage: true,
            unit: true,
          },
        },
        times: {
          orderBy: { time: "asc" },
        },
      },
    });

    return NextResponse.json(reminder, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
