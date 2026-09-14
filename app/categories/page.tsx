import { prisma } from "@/lib/prisma";
import CategoriesClient from "./CategoriesClient";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    where: {
      active: true,
    },
    orderBy: [
      {
        tier: "asc",
      },
      {
        title: "asc",
      },
    ],
  });

  return <CategoriesClient categories={categories} />;
}
