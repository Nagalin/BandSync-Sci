/*
  Warnings:

  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Event" DROP CONSTRAINT "Event_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "status" SET DEFAULT 'UPCOMING',
ADD CONSTRAINT "Event_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Event_id_seq";
