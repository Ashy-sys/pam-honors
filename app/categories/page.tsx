import { prisma } from "@/lib/prisma";
import CategoriesClient from "./CategoriesClient";

export const dynamic = "force-dynamic";

export default async function Categories() {
  const categories = await prisma.category.findMany({
    where: { active: true },
    orderBy: { createdAt: "asc" },
  });

  return <CategoriesClient categories={categories} />;
}
