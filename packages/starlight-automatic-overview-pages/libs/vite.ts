import type { ViteUserConfig } from "astro";

import type { StarlightAutomaticOverviewPagesConfig } from "..";

export function vitePluginStarlightAutomaticOverviewPagesConfig(
  config: StarlightAutomaticOverviewPagesConfig
): VitePlugin {
  const moduleId = "virtual:starlight-automatic-overview-pages-config";
  const resolvedModuleId = `\0${moduleId}`;
  const moduleContent = `export default ${JSON.stringify(config)}`;

  return {
    name: "vite-plugin-starlight-automatic-overview-pages",
    load(id) {
      return id === resolvedModuleId ? moduleContent : undefined;
    },
    resolveId(id) {
      return id === moduleId ? resolvedModuleId : undefined;
    },
  };
}

type VitePlugin = NonNullable<ViteUserConfig["plugins"]>[number];
