import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function GET(req: Request) {
  try {
    const orders = await prisma.order.findMany();
    return NextResponse.json(orders);
  } catch (e) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
