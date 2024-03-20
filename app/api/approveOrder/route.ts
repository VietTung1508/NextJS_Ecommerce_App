import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { revalidatePath } from "next/cache";

export const revalidate = true;

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const updatedOrder = await prisma.order.update({
      where: { id: data.id },
      data: {
        approved: true,
      },
    });
    revalidatePath("/admin/orders");
    return NextResponse.json(updatedOrder);
  } catch (e) {
    console.log(e, "Approve Fail");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
