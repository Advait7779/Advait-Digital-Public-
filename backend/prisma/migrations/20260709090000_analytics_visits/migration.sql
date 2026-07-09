-- CreateTable
CREATE TABLE "analytics_visits" (
    "id" SERIAL NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "page" TEXT NOT NULL,
    "referrer" TEXT,
    "utm_source" TEXT,
    "utm_medium" TEXT,
    "utm_campaign" TEXT,
    "device" TEXT NOT NULL DEFAULT 'unknown',
    "browser" TEXT NOT NULL DEFAULT 'unknown',
    "ip_address" TEXT,
    "session_id" TEXT,

    CONSTRAINT "analytics_visits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analytics_counters" (
    "key" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analytics_counters_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE INDEX "idx_analytics_visits_ts" ON "analytics_visits"("ts" DESC);

-- CreateIndex
CREATE INDEX "idx_analytics_visits_page" ON "analytics_visits"("page");

-- CreateIndex
CREATE INDEX "idx_analytics_visits_session" ON "analytics_visits"("session_id");
