/**
 * SEOHead — Reusable per-page SEO meta tag injector
 * Uses react-helmet-async. Wrap the entire app with <HelmetProvider> in main.jsx.
 * Does NOT change any visible UI.
 */
import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Advait Digital Services';
const BASE_URL  = 'https://advaitdigital.co.in';
const OG_IMAGE  = `${BASE_URL}/favicon.png`;
const DEFAULT_ROBOTS = 'index, follow';

export default function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogType    = 'website',
  robots    = DEFAULT_ROBOTS,
  schema    = null,   // JSON-LD object (plain JS object, will be stringified)
}) {
  const fullTitle    = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;

  return (
    <Helmet>
      {/* ── Primary Meta ───────────────────────────────── */}
      <title>{fullTitle}</title>
      <meta name="description"        content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots"             content={robots} />
      <link rel="canonical"           href={canonicalUrl} />

      {/* ── Open Graph (WhatsApp / Facebook / LinkedIn previews) ── */}
      <meta property="og:type"        content={ogType} />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url"         content={canonicalUrl} />
      <meta property="og:image"       content={OG_IMAGE} />
      <meta property="og:image:alt"   content={`${SITE_NAME} Logo`} />
      <meta property="og:locale"      content="en_IN" />

      {/* ── Twitter Card ───────────────────────────────── */}
      <meta name="twitter:card"        content="summary" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={OG_IMAGE} />

      {/* ── JSON-LD Structured Data (per-page, optional) ── */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
