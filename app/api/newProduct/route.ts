import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { revalidatePath } from "next/cache";

export const revalidate = true;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: parseInt(body.price),
        image: body.image,
        quantity: parseInt(body.quantity),
        author: body.author,
        pages: parseInt(body.pages),
        publisher: body.publisher,
        isAdult: body.isAdult,
        type: "PaperBack",
        salePrice: 0,
        category: {
          connect: { id: body.categoryIds },
        },
      },
    });
    revalidatePath("/admin/products");
    return NextResponse.json(product);
  } catch (err: any) {
    console.log(err, "Create New Product Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
