import prisma from "@/app/libs/prismadb";

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
      },
    });
    return orders;
  } catch (e) {
    console.log(e);
    return [];
  }
}
