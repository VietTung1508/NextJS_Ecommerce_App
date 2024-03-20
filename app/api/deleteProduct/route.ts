import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { revalidatePath } from "next/cache";

export const revalidate = true;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;
    await prisma.product.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/admin/products");
    return new NextResponse("Delete Success", { status: 200 });
  } catch (e) {
    console.log(e, "Delete Product Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
