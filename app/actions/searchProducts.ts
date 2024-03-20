import prisma from "@/app/libs/prismadb";

export async function searchProducts(searchKey: string, page: number = 1) {
  try {
    const products = await prisma.product.findMany({
      skip: 20 * (page - 1),
      take: 20,
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
    return products;
  } catch (e) {
    console.log(e);
    return [];
  }
}
