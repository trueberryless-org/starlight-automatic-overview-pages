// import type { StarlightUserConfig } from "@astrojs/starlight/types";
import { AstroError } from "astro/errors";
import { z } from "astro/zod";

export const configSchema = z.object({}).default({});

export function validateConfig(
  userConfig: unknown
): StarlightAutomaticOverviewPagesConfig {
  const config = configSchema.safeParse(userConfig);

  if (!config.success) {
    const errors = config.error.flatten();

    throw new AstroError(
      `Invalid starlight-automatic-overview-pages configuration:
      
      ${errors.formErrors.map((formError) => ` - ${formError}`).join("\n")}
      ${Object.entries(errors.fieldErrors)
        .map(
          ([fieldName, fieldErrors]) =>
            ` - ${fieldName}: ${fieldErrors.join(" - ")}`
        )
        .join("\n")}
        `,
      `See the error report above for more informations.\n\nIf you believe this is a bug, please file an issue at https://github.com/trueberryless-org/starlight-automatic-overview-pages/issues/new`
    );
  }

  return config.data;
}

export type StarlightAutomaticOverviewPagesUserConfig = z.input<
  typeof configSchema
>;
export type StarlightAutomaticOverviewPagesConfig = z.output<
  typeof configSchema
>;
