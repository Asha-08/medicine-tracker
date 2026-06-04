/*
  Warnings:

  - You are about to drop the column `date` on the `ReminderSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `isTaken` on the `ReminderSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `ReminderSchedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ReminderSchedule" DROP COLUMN "date",
DROP COLUMN "isTaken",
DROP COLUMN "time",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "ReminderTime" (
    "id" SERIAL NOT NULL,
    "reminderId" INTEGER NOT NULL,
    "time" TEXT NOT NULL,
    "isTaken" BOOLEAN NOT NULL DEFAULT false,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReminderTime_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReminderTime" ADD CONSTRAINT "ReminderTime_reminderId_fkey" FOREIGN KEY ("reminderId") REFERENCES "ReminderSchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
