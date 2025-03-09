import type { StarlightPageProps } from "@astrojs/starlight/props";
import { titleCase } from "title-case";

export function getPageProps(title: string): StarlightPageProps {
  return {
    frontmatter: {
      pagefind: false,
      title: titleCase(title),
      prev: false,
      next: false,
    },
  };
}
