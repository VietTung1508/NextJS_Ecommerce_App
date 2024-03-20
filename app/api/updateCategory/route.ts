import prisma from "@/app/libs/prismadb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const revalidate = true;

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const updatedCategory = await prisma.category.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name,
      },
    });
    revalidatePath("/admin/categories");
    return NextResponse.json(updatedCategory);
  } catch (err) {
    console.log(err, "Update Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
