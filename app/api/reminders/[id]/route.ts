import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/db";

// PUT — reminder update 
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { frequency, times } = await req.json();

    // Verify reminder belongs to user
    const existing = await prisma.reminderSchedule.findUnique({
      where: { id: parseInt(id) },
      include: { medicine: true },
    });

    if (!existing || existing.medicine.userId !== parseInt(session.user.id)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Delete old times and create new ones
    await prisma.reminderTime.deleteMany({
      where: { reminderId: parseInt(id) },
    });

    const reminder = await prisma.reminderSchedule.update({
      where: { id: parseInt(id) },
      data: {
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

    return NextResponse.json(reminder);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// PUT — single time slot isTaken toggle
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { isTaken } = await req.json();

    // Verify time slot belongs to user
    const existing = await prisma.reminderTime.findUnique({
      where: { id: parseInt(id) },
      include: {
        reminder: {
          include: { medicine: true },
        },
      },
    });

    if (
      !existing ||
      existing.reminder.medicine.userId !== parseInt(session.user.id)
    ) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const reminderTime = await prisma.reminderTime.update({
      where: { id: parseInt(id) },
      data: { isTaken },
    });

    return NextResponse.json(reminderTime);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// DELETE — reminder delete করো
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.reminderSchedule.findUnique({
      where: { id: parseInt(id) },
      include: { medicine: true },
    });

    if (!existing || existing.medicine.userId !== parseInt(session.user.id)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.reminderSchedule.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Reminder deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
