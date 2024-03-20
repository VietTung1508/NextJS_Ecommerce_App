import prisma from "@/app/libs/prismadb";

async function getCategories() {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export default getCategories;
