import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import type { ImageProps } from "next/image";
import Link from 'next/link';
import type { LinkProps } from "next/link";
import fs from "fs";
import matter from "gray-matter";
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { NextSeo } from 'next-seo';
import type { Post } from "../../types";
import { convertFrontMatter } from "../../src/utility";
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import remarkPrism from 'remark-prism';
import { createElement, Fragment } from 'react';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';

type Props = {
  post: Post;
};

const CustomLink = ({
  children,
  href,
}: LinkProps & {
  children?: React.ReactNode;
}): JSX.Element =>
  href.toString().startsWith('/') || href === '' ? (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  ) : (
    <a href={href.toString()} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );

const CustomImage = ({
  src,
  alt,
  ...prop
}: ImageProps): JSX.Element =>
  <Image src={src} alt={alt} width="1200" height="700" {...prop} />;

const toReactNode = (content: string) => {
  // Server側でReactNodeへの変換が行われる
  // Client側でやりたい場合は、https://reffect.co.jp/react/nextjs-markdown-blog#useEffect_useState で実装する
  return unified()
    .use(rehypeParse, {
      fragment: true,
    })
    .use(rehypeReact, {
      createElement,
      Fragment,
      components: {
        a: (props: any) => <CustomLink {...props} />,
        img: (props: any) => <CustomImage {...props} />,
      },
    })
    .processSync(content).result;
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  console.log("params:", params);
  if (params !== undefined) {
    const { slug } = params;
    const file = fs.readFileSync(`posts/${slug}.md`, "utf-8");
    console.log(file);
    const { data, content } = matter(file);
    if (typeof slug === "string") {
      const result = await unified()
        .use(remarkParse)
        .use(remarkPrism, {
          /* options */
          plugins: ['line-numbers'],
        })
        .use(remarkToc, {
          heading: '目次',
        })
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeSlug)
        .use(rehypeStringify, { allowDangerousHtml: true })
        .process(content);
      console.log('result:',result);
      console.log('html:', result.toString());
      return {
        props: {
          post: {
            frontMatter: convertFrontMatter(data),
            content: result.toString(),
            slug,
          },
        },
      };
    }
  }
  return {
    props: {
      post: {
        frontMatter: {},
        slug: "",
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const files = fs.readdirSync("posts");
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ""),
    },
  }));
  console.log("paths:", paths);
  return {
    paths,
    fallback: false,
  };
};

const Post: NextPage<Props> = ({ post }) => {
  const { frontMatter, content, slug } = post
  return (
    <>
      <NextSeo
        title={frontMatter.title}
        description={frontMatter.description}
        openGraph={{
          type: 'website',
          url: `http:localhost:3000/posts/${slug}`,
          title: frontMatter.title,
          description: frontMatter.description,
          images: [
            {
              url: `https://localhost:3000/${frontMatter.image}`,
              width: 1200,
              height: 700,
              alt: frontMatter.title,
            },
          ],
        }}
      />
      <div className="prose prose-lg max-w-none">
        <div className="border">
          <Image
            src={`/${frontMatter.image}`}
            width={1200}
            height={700}
            alt={frontMatter.title}
          />
        </div>
        <h1 className="mt-12">{frontMatter.title}</h1>
        <span>{frontMatter.date}</span>
        <div className="space-x-2">
        {/* {frontMatter.categories.map((category) => (
          <span key={category}>
            <Link href={`/categories/${category}`}>
              <a>{category}</a>
            </Link>
          </span>
        ))} */}
        </div>
        {typeof content === "string" ? (
            // <div dangerouslySetInnerHTML={{ __html: content }}></div>
            toReactNode(content)
          ) : (
            <div>コンテンツ存在しません</div>
          )
        }
      </div>
    </>
  );
};

export default Post;
