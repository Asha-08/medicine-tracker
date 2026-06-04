import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/db";

// GET — all stock logs 
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const stockLogs = await prisma.stockLog.findMany({
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
            totalStock: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(stockLogs);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// POST — create new stock log 
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { medicineId, type, quantity, note } = await req.json();

    if (!medicineId || !type || !quantity) {
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

    // Stock update 
    const newStock =
      type === "IN"
        ? medicine.totalStock + parseInt(quantity)
        : medicine.totalStock - parseInt(quantity);

    if (newStock < 0) {
      return NextResponse.json(
        { error: "Stock cannot be negative" },
        { status: 400 }
      );
    }

    // Transaction — stock log create and medicine update 
    const [stockLog] = await prisma.$transaction([
      prisma.stockLog.create({
        data: {
          medicineId: parseInt(medicineId),
          type,
          quantity: parseInt(quantity),
          note: note || null,
        },
        include: {
          medicine: {
            select: {
              id: true,
              name: true,
              dosage: true,
              unit: true,
              totalStock: true,
            },
          },
        },
      }),
      prisma.medicine.update({
        where: { id: parseInt(medicineId) },
        data: { totalStock: newStock },
      }),
    ]);

    return NextResponse.json(stockLog, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
