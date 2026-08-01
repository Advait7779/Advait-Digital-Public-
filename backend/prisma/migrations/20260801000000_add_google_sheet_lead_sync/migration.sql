ALTER TABLE "leads" ADD COLUMN "sheet_synced_at" TIMESTAMP(3);
ALTER TABLE "leads" ADD COLUMN "sheet_sync_attempts" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "leads" ADD COLUMN "sheet_sync_error" TEXT;

CREATE INDEX "idx_leads_sheet_synced_at" ON "leads"("sheet_synced_at");
