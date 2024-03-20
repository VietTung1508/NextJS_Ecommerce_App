import prisma from "@/app/libs/prismadb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const revalidate = true;

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: body.id,
      },
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
        salePrice: parseInt(body.salePrice),
        category: {
          connect: { id: body.categoryIds },
        },
      },
    });
    revalidatePath("/admin/products");
    return NextResponse.json(updatedProduct);
  } catch (err) {
    console.log(err, "Update Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
