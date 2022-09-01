import type { NextPage, GetStaticProps } from "next";
import PostCard from "../components/post-card";
import Pagination from '../components/pagination';
import type { Post } from "../types";
import { findPosts } from "../src/utility";

const PAGE_SIZE = 2;

// FIXME: [page].tsxにある関数と共通化したい
const range = (start: number, end: number, length: number = end - start + 1) =>
  Array.from({ length }, (_, i) => start + i);

type Props = {
  posts: Post[];
  pages?: number[];
};

export const getStaticProps: GetStaticProps<Props> = () => {
  const posts = findPosts();
  const sortedPosts = posts.sort((postA, postB) => (
    // FIXME: この型ガードはfrontMatterへ共通化したい
    typeof postA.frontMatter.date === "string" && postB.frontMatter.date === "string" ? new Date(postA.frontMatter.date) > new Date(postB.frontMatter.date) ? -1 : 1 : 0
  ));
  const pages = range(1, Math.ceil(posts.length / PAGE_SIZE));
  return {
    props: {
      posts: sortedPosts,
      pages,
    },
  };
};

const Home: NextPage<Props> = ({ posts, pages }) => {
  console.log("posts:", posts);
  return (
    <div className="my-8">
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      <Pagination pages={pages} />
    </div>
  );
};

export default Home;
