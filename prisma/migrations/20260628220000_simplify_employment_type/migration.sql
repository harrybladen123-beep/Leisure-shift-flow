-- Simplify EmploymentType to CASUAL/CONTRACTED only.
-- Table is empty at the time of this migration, so a direct cast is safe.
ALTER TYPE "EmploymentType" RENAME TO "EmploymentType_old";
CREATE TYPE "EmploymentType" AS ENUM ('CASUAL', 'CONTRACTED');
ALTER TABLE "Employee" ALTER COLUMN "employmentType" TYPE "EmploymentType" USING ("employmentType"::text::"EmploymentType");
DROP TYPE "EmploymentType_old";
