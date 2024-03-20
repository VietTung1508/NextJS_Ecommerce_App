import prisma from "@/app/libs/prismadb";

export default async function getAllProducts() {
  try {
    const products = await prisma.product.findMany({
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
