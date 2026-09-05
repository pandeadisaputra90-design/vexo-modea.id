import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { SITE } from './src/config/site.ts'

/**
 * Injects <title>, meta description, Open Graph / Twitter card tags, and a
 * JSON-LD AutoDealer schema into index.html at build/dev time — all sourced
 * from src/config/site.ts so SITE stays the single source of truth even for
 * static HTML that crawlers read before any JS runs.
 */
function seoHtmlPlugin(): Plugin {
  const title = `${SITE.brand} | ${SITE.tagline}`
  const ogImage = `${SITE.url}${SITE.ogImage}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: SITE.brand,
    description: SITE.description,
    image: ogImage,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address,
      addressLocality: 'Denpasar',
      addressRegion: 'Bali',
      addressCountry: 'ID',
    },
    openingHours: SITE.hours,
    sameAs: Object.values(SITE.social).filter(Boolean),
  }

  return {
    name: 'seo-html',
    transformIndexHtml() {
      return [
        { tag: 'title', children: title, injectTo: 'head-prepend' },
        { tag: 'meta', attrs: { name: 'description', content: SITE.description }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:type', content: 'website' }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:title', content: title }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:description', content: SITE.description }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:url', content: SITE.url }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:image', content: ogImage }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:locale', content: 'id_ID' }, injectTo: 'head' },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' }, injectTo: 'head' },
        { tag: 'meta', attrs: { name: 'twitter:title', content: title }, injectTo: 'head' },
        { tag: 'meta', attrs: { name: 'twitter:description', content: SITE.description }, injectTo: 'head' },
        { tag: 'meta', attrs: { name: 'twitter:image', content: ogImage }, injectTo: 'head' },
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(jsonLd),
          injectTo: 'head',
        },
      ]
    },
  }
}

// https://vite.dev
export default defineConfig({
  plugins: [react(), seoHtmlPlugin()],
  base: '/vexo-modea.id/',
})

