import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { Admin } from "@prisma/client";

function exclude(admin: any, keys: any) {
  return Object.fromEntries(
    Object.entries(admin).filter(([key]) => !keys.includes(key))
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new NextResponse("Missing Info", { status: 400 });
    }

    const admin = await prisma.admin.findFirst({
      where: {
        // @ts-ignore
        email: body?.email,
      },
    });

    const adminWithoutPassword = exclude(admin, ["password"]);

    const isAdmin = admin?.password === body.password;

    if (isAdmin) {
      return NextResponse.json(adminWithoutPassword);
    } else {
      return new NextResponse("Invalid Email or Password", { status: 403 });
    }
  } catch (err: any) {
    console.log(err, "Registing Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
