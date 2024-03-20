import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const userUpdated = await prisma.user.update({
      where: {
        email: body.email,
      },
      data: {
        address: body.address,
        phoneNumber: body.phoneNumber,
        email: body.email,
        image: body.image,
        name: body.name,
      },
    });

    return NextResponse.json(userUpdated);
  } catch (e) {
    console.log(e, "Add Address Failed");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
