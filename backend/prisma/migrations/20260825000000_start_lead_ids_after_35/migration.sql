-- Keep new CMS lead IDs clear of the 1-35 test rows already present in
-- the linked Google Sheet. Never move an existing production sequence
-- backwards if the database already contains a higher lead ID.
SELECT setval(
  pg_get_serial_sequence('leads', 'id'),
  GREATEST(COALESCE((SELECT MAX("id") FROM "leads"), 0), 35),
  true
);
