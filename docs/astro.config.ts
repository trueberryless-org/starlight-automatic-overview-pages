import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightAutomaticOverviewPages from "starlight-automatic-overview-pages";

export default defineConfig({
  integrations: [
    starlight({
      editLink: {
        baseUrl: "https://github.com/trueberryless-org/starlight-automatic-overview-pages/edit/main/docs/",
      },
      plugins: [starlightAutomaticOverviewPages()],
      sidebar: [
        {
          label: "Start Here",
          items: [{ slug: "getting-started" }],
        },
        {
          label: "Demo",
          autogenerate: {
            directory: "demo",
          },
        },
      ],
      social: {
        github: "https://github.com/trueberryless-org/starlight-automatic-overview-pages",
      },
      title: "Starlight Automatic Overview Pages",
    }),
  ],
});
