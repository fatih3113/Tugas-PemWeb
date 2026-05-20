-- AlterTable
ALTER TABLE "events" ADD COLUMN     "pembicara_id" INTEGER;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_pembicara_id_fkey" FOREIGN KEY ("pembicara_id") REFERENCES "pembicara"("id") ON DELETE SET NULL ON UPDATE CASCADE;
