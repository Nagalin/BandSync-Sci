-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('UPCOMING', 'ONGOING', 'COMPLETED');

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "eventName" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL, 
    "endTime" TEXT NOT NULL,
    "dressCode" TEXT,
    "status" "EventStatus" NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
