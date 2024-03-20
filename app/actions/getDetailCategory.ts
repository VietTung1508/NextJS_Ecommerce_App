import prisma from "@/app/libs/prismadb";

export async function getDetailCategory(id: string) {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: id,
      },
    });

    return category;
  } catch (err) {
    return [];
  }
}
