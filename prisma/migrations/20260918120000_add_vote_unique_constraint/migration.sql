-- CreateIndex
CREATE UNIQUE INDEX "Vote_userId_categoryId_key" ON "Vote"("userId", "categoryId");
