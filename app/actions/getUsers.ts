import prisma from "@/app/libs/prismadb";

export async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (e) {
    console.log(e);
    return [];
  }
}
