import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const products = body.products;

    const order = await prisma.order.create({
      data: {
        total: body.total,
        phoneNumber: body.phoneNumber,
        delivery: body.delivery,
        address: body.address,
        payment: body.payment,
        products: products,
        user: {
          connect: { email: body.email },
        },
      },
    });

    return NextResponse.json(order);
  } catch (e) {
    console.log(e, "Create Order Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
