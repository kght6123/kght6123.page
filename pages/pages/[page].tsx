import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import fs from "fs";
import type { Post } from "../../types";
import { findPosts } from "../../src/utility";
//略
const PAGE_SIZE = 2;

type Props = {
  posts: Post[];
  pages?: number[];
  current_page?: number;
};

const range = (start: number, end: number, length = end - start + 1) =>
  Array.from({ length }, (_, i) => start + i);

export async function getStaticPaths() {
  const files = fs.readdirSync('posts');
  const count = files.length;
  const paths = range(1, Math.ceil(count / PAGE_SIZE)).map((i) => ({
    params: { page: i.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<Props> = ({ params }) => {
  console.log("params:", params);
  if (params !== undefined && typeof params.page === "string") {
    const current_page = parseInt(params.page);
    const posts = findPosts();
    const pages = range(1, Math.ceil(posts.length / PAGE_SIZE));
    const sortedPosts = posts.sort((postA, postB) =>
      typeof postA.frontMatter.date === "string" && typeof postB.frontMatter.date === "string" ? new Date(postA.frontMatter.date) > new Date(postB.frontMatter.date) ? -1 : 1 : 0
    );
    const slicedPosts = sortedPosts.slice(
      PAGE_SIZE * (current_page - 1),
      PAGE_SIZE * current_page
    );
    return {
      props: {
        posts: slicedPosts,
        pages,
        current_page,
      },
    };
  }
  return {
    props: {
      posts: [],
    },
  };
}
