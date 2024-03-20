import prisma from "@/app/libs/prismadb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const revalidate = true;

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);
  try {
    const updatedAdmin = await prisma.admin.update({
      where: {
        id: body.id,
      },
      data: {
        email: body.email,
      },
    });
    revalidatePath("/admin/profile");
    return NextResponse.json(updatedAdmin);
  } catch (err) {
    console.log(err, "Update Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
