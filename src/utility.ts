import type { FrontMatter, Post } from "../types";
import fs from "fs";
import matter from "gray-matter";

export const convertFrontMatter = (data: { [key: string]: unknown }) => {
  const frontMatter = Object.entries(data)
    .filter((entry): entry is [string, string] => typeof entry[1] === "string")
    .reduce((p, cv) => {
      p[cv[0]] = cv[1];
      return p;
    }, {} as FrontMatter);
  return frontMatter;
};

export const findPosts = (): Post[] => {
  // FIXME: Promise.allで効率化できそう
  const files = fs.readdirSync("posts")
  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fileContent = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data /*, content*/ } = matter(fileContent);
    console.log("fileContent:", fileContent);
    console.log("slug:", slug);
    console.log("data:", data);
    // console.log('content:', content);
    return {
      frontMatter: convertFrontMatter(data),
      slug,
    };
  });
  return posts;
}
