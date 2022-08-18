// https://github.com/garmeeh/next-seo
const config = {
  title: 'Next.js Blog',
  description: 'Next.jsなどの技術情報を発信するブログです。',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://localhost:3000/',
    site_name: 'BLOG',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};
export default config;