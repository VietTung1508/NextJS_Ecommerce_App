import prisma from "@/app/libs/prismadb";

export async function getAuthors() {
  try {
    const authors = await prisma.product.findMany({
      select: {
        author: true,
      },
      distinct: ["author"],
    });
    return authors;
  } catch (e) {
    console.log(e);
    return [];
  }
}
