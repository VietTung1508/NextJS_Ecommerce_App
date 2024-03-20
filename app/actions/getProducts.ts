import prisma from "@/app/libs/prismadb";

export default async function getProducts(page: number = 1) {
  try {
    const products = await prisma.product.findMany({
      skip: 20 * (page - 1),
      take: 20,
      include: {
        category: true,
      },
    });
    return products;
  } catch (err: any) {
    console.log(err);
    return [];
  }
}
