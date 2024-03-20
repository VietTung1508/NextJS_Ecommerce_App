import prisma from "@/app/libs/prismadb";

export async function getProductsByParam(
  name: string,
  min?: number,
  max?: number
) {
  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            category: {
              name: name,
            },
          },
          {
            author: name,
          },
          {
            price: {
              lt: max,
              gt: min,
            },
          },
        ],
      },
      include: {
        category: true,
      },
    });
    return products;
  } catch (e) {
    console.log(e);
    return [];
  }
}
