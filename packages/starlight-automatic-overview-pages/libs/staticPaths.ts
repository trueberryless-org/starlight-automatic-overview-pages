// @ts-ignore
import { getCollection, type CollectionEntry } from "astro:content";
import { getAllConfigLocales } from "./i18n";

export async function getStaticOverviewPaths() {
  const locales = getAllConfigLocales();
  const docs: CollectionEntry<"docs">[] = await getCollection("docs");

  const folderMap = new Map();

  // Collect folders and group entries by folder
  for (const entry of docs) {
    const segments = entry.id.split("/");
    if (segments.length > 1) {
      const folder = segments.slice(0, -1).join("/");
      if (!folderMap.has(folder)) {
        folderMap.set(folder, []);
      }
      folderMap.get(folder).push(entry);
    }
  }

  const paths = [];

  // Create overview paths
  for (const [folder, entries] of folderMap) {
    const overviewEntry = docs.find(
      (entry: any) => entry.id === `${folder}/index` || entry.id === folder
    );
    for (const locale of locales) {
      paths.push({
        params: { locale, path: folder },
        props: { id: folder, entries, entry: overviewEntry || null },
      });
    }
  }

  return paths;
}
