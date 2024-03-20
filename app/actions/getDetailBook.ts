import prisma from "@/app/libs/prismadb";

export async function getDetailBook(id: string) {
  try {
    const book = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        category: true,
      },
    });

    return book;
  } catch (err) {
    return [];
  }
}
