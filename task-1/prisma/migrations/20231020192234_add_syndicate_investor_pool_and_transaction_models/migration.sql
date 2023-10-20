/*
  Warnings:

  - Added the required column `poolId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "poolId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Pool" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InvestorToPool" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PoolToSyndicate" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_InvestorToPool_AB_unique" ON "_InvestorToPool"("A", "B");

-- CreateIndex
CREATE INDEX "_InvestorToPool_B_index" ON "_InvestorToPool"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PoolToSyndicate_AB_unique" ON "_PoolToSyndicate"("A", "B");

-- CreateIndex
CREATE INDEX "_PoolToSyndicate_B_index" ON "_PoolToSyndicate"("B");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "Pool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvestorToPool" ADD CONSTRAINT "_InvestorToPool_A_fkey" FOREIGN KEY ("A") REFERENCES "Investor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvestorToPool" ADD CONSTRAINT "_InvestorToPool_B_fkey" FOREIGN KEY ("B") REFERENCES "Pool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PoolToSyndicate" ADD CONSTRAINT "_PoolToSyndicate_A_fkey" FOREIGN KEY ("A") REFERENCES "Pool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PoolToSyndicate" ADD CONSTRAINT "_PoolToSyndicate_B_fkey" FOREIGN KEY ("B") REFERENCES "Syndicate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
