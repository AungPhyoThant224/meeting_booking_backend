import { prisma } from "../src/prisma/prismaClient.js";
import { Role } from "../src/generated/prisma/enums.js";
import bcrypt from "bcrypt";

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@system.com" },
    update: {},
    create: {
      email: "admin@system.com",
      name: "System Admin",
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log({ admin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
