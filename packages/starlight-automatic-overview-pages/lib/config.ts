// import type { StarlightUserConfig } from "@astrojs/starlight/types";
import { AstroError } from "astro/errors";
import { z } from "astro/zod";

export const configSchema = z.object({});

export function validateConfig(
  userConfig: unknown
): StarlightAutomaticOverviewPagesConfig {
  const config = configSchema.safeParse(userConfig);

  if (!config.success) {
    const errors = config.error.flatten();

    throw new AstroError(
      `Invalid @trueberryless-org/starlight-plugins-docs-components configuration:
      
      ${errors.formErrors.map((formError) => ` - ${formError}`).join("\n")}
      ${Object.entries(errors.fieldErrors)
        .map(
          ([fieldName, fieldErrors]) =>
            ` - ${fieldName}: ${fieldErrors.join(" - ")}`
        )
        .join("\n")}
        `,
      `See the error report above for more informations.\n\nIf you believe this is a bug, please file an issue at https://github.com/trueberryless-org/starlight-plugins-docs-components/issues/new`
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
