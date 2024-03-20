import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, isSub, categoryId } = body;

    if (!isSub) {
      const category = await prisma.category.create({
        data: {
          name: data,
        },
      });
      return NextResponse.json(category);
    } else {
      const subCategory = await prisma.category.update({
        where: {
          id: categoryId,
        },
        data: {
          subCategory: {
            push: data,
          },
        },
      });
      revalidatePath("/admin/categories");
      return NextResponse.json(subCategory);
    }
  } catch (err: any) {
    console.log(err, "Create New Category Error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
