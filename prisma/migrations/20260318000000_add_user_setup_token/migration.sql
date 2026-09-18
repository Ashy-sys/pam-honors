-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL;
ALTER TABLE "User" ADD COLUMN "setupTokenHash" TEXT;
ALTER TABLE "User" ADD COLUMN "setupTokenExpires" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "User_setupTokenHash_key" ON "User"("setupTokenHash");
