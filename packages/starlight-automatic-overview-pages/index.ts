import type { StarlightPlugin } from "@astrojs/starlight/types";
import {
  type StarlightAutomaticOverviewPagesConfig,
  validateConfig,
  type StarlightAutomaticOverviewPagesUserConfig,
} from "./libs/config";
import { vitePluginStarlightAutomaticOverviewPagesConfig } from "./libs/vite";
import { Translations } from "./translations";

export type {
  StarlightAutomaticOverviewPagesConfig,
  StarlightAutomaticOverviewPagesUserConfig,
};

export default function starlightAutomaticOverviewPages(
  userConfig?: StarlightAutomaticOverviewPagesUserConfig
): StarlightPlugin {
  return {
    name: "starlight-automatic-overview-pages",
    hooks: {
      "i18n:setup"({ injectTranslations }) {
        injectTranslations(Translations);
      },
      "config:setup"({ logger, addIntegration }) {
        const config = validateConfig(userConfig);

        addIntegration({
          name: "starlight-automatic-overview-pages-integration",
          hooks: {
            "astro:config:setup": ({ injectRoute, updateConfig }) => {
              injectRoute({
                entrypoint: `starlight-automatic-overview-pages/routes/Overview.astro`,
                pattern: "[...locale]/[...path]",
                prerender: true,
              });

              updateConfig({
                vite: {
                  plugins: [
                    vitePluginStarlightAutomaticOverviewPagesConfig(config),
                  ],
                },
              });
            },
          },
        });
      },
    },
  };
}
