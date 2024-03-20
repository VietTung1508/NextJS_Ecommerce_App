import prisma from "@/app/libs/prismadb";

export async function getProductsNumber() {
  try {
    const num = (await prisma.product.findMany()).length;
    return num;
  } catch (e) {
    console.log(e);
    return 0;
  }
}
