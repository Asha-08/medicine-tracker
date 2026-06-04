import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/db";

// GET — one medicine
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const medicine = await prisma.medicine.findUnique({
      where: {
        id: parseInt(id),
        userId: parseInt(session.user.id),
      },
    });

    if (!medicine) {
      return NextResponse.json({ error: "Medicine not found" }, { status: 404 });
    }

    return NextResponse.json(medicine);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// PUT — medicine update 
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
    const { name, dosage, unit, totalStock, threshold,doseAmount } = await req.json();

    if (!name || !dosage || !unit || !totalStock || !threshold || !doseAmount) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const medicine = await prisma.medicine.update({
      where: {
        id: parseInt(id),
        userId: parseInt(session.user.id),
      },
      data: {
        name,
        dosage,
        unit,
        totalStock: parseInt(totalStock),
        threshold: parseInt(threshold),
        doseAmount: parseInt(doseAmount),
      },
    });

    return NextResponse.json(medicine);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

// DELETE — medicine delete 
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

    await prisma.medicine.delete({
      where: {
        id: parseInt(id),
        userId: parseInt(session.user.id),
      },
    });

    return NextResponse.json({ message: "Medicine deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
