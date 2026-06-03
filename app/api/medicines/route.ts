import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/db";

// GET 
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const medicines = await prisma.medicine.findMany({
      where: { userId: parseInt(session.user.id) },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(medicines);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// POST 
export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, dosage, unit, totalStock, threshold } = await req.json();

    if (!name || !dosage || !unit || !totalStock || !threshold) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const medicine = await prisma.medicine.create({
      data: {
        name,
        dosage,
        unit,
        totalStock: parseInt(totalStock),
        threshold: parseInt(threshold),
        userId: parseInt(session.user.id),
      },
    });

    return NextResponse.json(medicine, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
