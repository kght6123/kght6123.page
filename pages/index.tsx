import type { NextPage, GetStaticProps } from "next";
import PostCard from "../components/post-card";
import type { Post } from "../types";
import { findPosts } from "../src/utility";

type Props = {
  posts: Post[];
};

export const getStaticProps: GetStaticProps<Props> = () => {
  const posts = findPosts();
  const sortedPosts = posts.sort((postA, postB) =>
    new Date(postA.frontMatter.date) > new Date(postB.frontMatter.date) ? -1 : 1
  );
  return {
    props: {
      posts: sortedPosts,
    },
  };
};

const Home: NextPage<Props> = ({ posts }) => {
  console.log("posts:", posts);
  return (
    <div className="my-8">
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
