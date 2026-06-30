import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const user = await prisma.user.create({
    data: {
      name: "Super Admin",
      email: "admin@pamhonors.com",
      password: hashedPassword,
      role: "SUPER_ADMIN",
    },
  });

  console.log("User created:", user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });