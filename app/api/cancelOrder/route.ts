import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;
    await prisma.order.delete({
      where: { id: id },
    });
    return new NextResponse("Cancel Success", { status: 200 });
  } catch (e) {
    console.log(e, "Cancel Fail");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
