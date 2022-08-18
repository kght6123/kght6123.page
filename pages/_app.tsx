import Layout from "../components/layout";
import "../styles/globals.css";
import 'prismjs/themes/prism-okaidia.min.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.min.css';
import type { AppProps } from "next/app";
import SEO from '../next-seo.config';
import { DefaultSeo } from 'next-seo';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
