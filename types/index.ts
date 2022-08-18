export type FrontMatter = {
  [key: string]: string;
};
export type Post = {
  frontMatter: FrontMatter;
  slug: string;
  content?: string;
};
