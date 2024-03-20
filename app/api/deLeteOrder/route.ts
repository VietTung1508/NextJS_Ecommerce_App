import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    const order = await prisma.order.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(order);
  } catch (e) {
    console.log(e, "Delete Order Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
