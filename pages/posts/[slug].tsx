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
import { toc } from 'mdast-util-toc';

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

const getToc = (options?: void | import('mdast-util-toc/lib').Options | undefined):
| void
| import('unified').Transformer<import('mdast').Root, import('mdast').Root> => {
  return (node) => {
    if (typeof options === "object") {
      const result = toc(node, options);
      if (result.map != null)
        node.children = [result.map];
      else
        console.error("result.map null error");
    } else {
      console.error("options is not supported");
    }
  };
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
      
      const toc = await unified()
        .use(remarkParse)
        .use(getToc, {
          heading: '目次',
          tight: true,
        })
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(content);
      
      console.log('result:',result);
      console.log('html:', result.toString());
      return {
        props: {
          post: {
            frontMatter: convertFrontMatter(data),
            content: result.toString(),
            toc: toc.toString(),
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
        slug: undefined,
        toc: undefined,
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
  const { frontMatter, content, slug, toc } = post
  // TODO: typeによる型ガードにする↓
  if (
    typeof frontMatter.title === "string"
     && typeof frontMatter.description === "string"
     && typeof frontMatter.categories === "object") {
      // titleとdescriptionはstring以外はありえない
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
          {frontMatter.categories.map((category) => (
            <span key={category}>
              <Link href={`/categories/${category}`}>
                <a>{category}</a>
              </Link>
            </span>
          ))}
          </div>
          <div className="grid grid-cols-12">
            {typeof content === "string" ? (
                <div className="col-span-9">{toReactNode(content)}</div>
              ) : (
                <div className="col-span-9">記事のコンテンツは存在しません</div>
              )
            }
            {typeof toc === "string" ? (
                <div className="col-span-3">
                  <div
                    className="sticky top-[50px]"
                    dangerouslySetInnerHTML={{ __html: toc }}
                  ></div>
                </div>
              ) : (
                <div className="col-span-3">目次なし</div>
              )
            }
          </div>
        </div>
      </>
    );
  } else {
    return <div>記事は存在しません</div>;
  }
};

export default Post;
