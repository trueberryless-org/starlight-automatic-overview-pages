import type { StarlightPlugin } from "@astrojs/starlight/types";
import {
  type StarlightAutomaticOverviewPagesConfig,
  validateConfig,
  type StarlightAutomaticOverviewPagesUserConfig,
} from "./lib/config";
import { vitePluginStarlightAutomaticOverviewPagesConfig } from "./lib/vite";

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
      setup({ logger, addIntegration }) {
        const config = validateConfig(userConfig);

        addIntegration({
          name: "starlight-automatic-overview-pages-integration",
          hooks: {
            "astro:config:setup": ({ updateConfig }) => {
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
