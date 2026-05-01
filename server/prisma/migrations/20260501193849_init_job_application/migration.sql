-- CreateTable
CREATE TABLE "JobApplication" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "jobUrl" TEXT,
    "location" TEXT,
    "salaryMin" INTEGER,
    "salaryMax" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'Saved',
    "dateApplied" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);
