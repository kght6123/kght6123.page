import type { FrontMatter } from "../types";

export const convertFrontMatter = (data: { [key: string]: unknown }) => {
  const frontMatter = Object.entries(data)
    .filter((entry): entry is [string, string] => typeof entry[1] === "string")
    .reduce((p, cv) => {
      p[cv[0]] = cv[1];
      return p;
    }, {} as FrontMatter);
  return frontMatter;
};
