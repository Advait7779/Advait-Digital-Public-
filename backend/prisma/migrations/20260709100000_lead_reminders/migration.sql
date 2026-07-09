ALTER TABLE "leads" ADD COLUMN "reminder_due_at" TIMESTAMP(3);
ALTER TABLE "leads" ADD COLUMN "reminder_sent_at" TIMESTAMP(3);
ALTER TABLE "leads" ADD COLUMN "reminder_attempts" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "leads" ADD COLUMN "reminder_last_error" TEXT;
ALTER TABLE "leads" ADD COLUMN "reminder_locked_at" TIMESTAMP(3);

CREATE INDEX "idx_leads_reminder_due_at" ON "leads"("reminder_due_at");
CREATE INDEX "idx_leads_reminder_sent_at" ON "leads"("reminder_sent_at");
