import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const banner = await prisma.banner.create({
      data: {
        title: body.title,
        descritions: body.description,
        backgroundImage: body.background,
        poster: body.poster,
        product: {
          connect: { id: body.productId },
        },
      },
    });
    return NextResponse.json(banner);
  } catch (e) {
    console.log(e, "Create New Banner Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
