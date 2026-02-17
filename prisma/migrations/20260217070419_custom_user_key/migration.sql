/*
  Warnings:

  - You are about to drop the column `UserId` on the `UserMessage` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `UserMessage` table. All the data in the column will be lost.
  - Added the required column `title` to the `UserMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usage" ADD COLUMN     "customKey" TEXT;

-- AlterTable
ALTER TABLE "UserMessage" DROP COLUMN "UserId",
DROP COLUMN "message",
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserMessage" ADD CONSTRAINT "UserMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
