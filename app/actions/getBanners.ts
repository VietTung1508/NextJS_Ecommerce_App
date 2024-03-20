import prisma from "@/app/libs/prismadb";

export async function getBanners(limit: boolean) {
  try {
    if (limit) {
      const banners = await prisma.banner.findMany({
        take: 3,
      });
      return banners;
    } else {
      const banners = await prisma.banner.findMany();
      return banners;
    }
  } catch (e) {
    console.log(e);
    return [];
  }
}
