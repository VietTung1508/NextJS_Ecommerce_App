import prisma from "@/app/libs/prismadb";

export async function getProductsByCategory(name: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: {
          name: name,
        },
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
