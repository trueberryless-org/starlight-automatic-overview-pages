import starlightConfig from "virtual:starlight/user-config";

export const DefaultLocale =
  starlightConfig.defaultLocale.lang === "root"
    ? undefined
    : starlightConfig.defaultLocale.lang;

export function getAllConfigLocales(): Locale[] {
  let locales: Locale[] = Object.keys(starlightConfig.locales ?? {}).map(
    (locale) => {
      return locale === "root" ? undefined : locale;
    }
  );
  if (locales.length === 0) locales.push(undefined);
  return locales;
}

export type Locale = string | undefined;
