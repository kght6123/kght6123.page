import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import PostCard from '../../components/post-card';
import type { Post } from "../../types";
import { findPosts } from "../../src/utility";

type Props = {
  posts: Post[];
};

export const getStaticProps: GetStaticProps<Props> = ({ params }) => {
  console.log("params:", params);
  if (params !== undefined) {
    const posts = findPosts();
    const category = params.category;
    if (typeof category === "string") {
      const filteredPosts = posts.filter((post) => {
        return post.frontMatter.categories.includes(category);
      });
      // TODO: 下のtypeofもtypeによる型ガードにする
      const sortedPosts = filteredPosts.sort((postA, postB) => typeof postA.frontMatter.date === "string" && postB.frontMatter.date === "string" ? new Date(postA.frontMatter.date) > new Date(postB.frontMatter.date) ? -1 : 1 : 0);
      return {
        props: {
          posts: sortedPosts,
        },
      };
    }
  }
  return {
    props: {
      posts: [],
    },
  };
};

export const getStaticPaths = () => {
  const categories = ['react', 'laravel'];
  const paths = categories.map((category) => ({ params: { category } }));
  return {
    paths,
    fallback: false,
  };
};

const Category: NextPage<Props> = ({ posts }) => {
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

export default Category;