import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/db";

// DELETE — stock log delete 
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

    // Verify stock log belongs to user
    const existing = await prisma.stockLog.findUnique({
      where: { id: parseInt(id) },
      include: { medicine: true },
    });

    if (!existing || existing.medicine.userId !== parseInt(session.user.id)) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Stock revert 
    const revertedStock =
      existing.type === "IN"
        ? existing.medicine.totalStock - existing.quantity
        : existing.medicine.totalStock + existing.quantity;

    // Transaction — stock log delete and medicine stock revert 
    await prisma.$transaction([
      prisma.stockLog.delete({
        where: { id: parseInt(id) },
      }),
      prisma.medicine.update({
        where: { id: existing.medicineId },
        data: { totalStock: revertedStock },
      }),
    ]);

    return NextResponse.json({ message: "Stock log deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
