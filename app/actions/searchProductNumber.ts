import prisma from "@/app/libs/prismadb";

export async function searchProductsNumber(searchKey: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: { contains: searchKey, mode: "insensitive" },
          },
          {
            author: { contains: searchKey, mode: "insensitive" },
          },
        ],
      },
    });
    return products.length;
  } catch (e) {
    console.log(e);
    return 0;
  }
}
