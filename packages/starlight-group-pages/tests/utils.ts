import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const vitestEnvKeys = new Set([
  "BASE_URL",
  "DEV",
  "MODE",
  "NODE_ENV",
  "PROD",
  "SSR",
]);

const astroBin = join(
  dirname(createRequire(import.meta.url).resolve("astro/package.json")),
  "bin/astro.mjs"
);

export async function buildFixture(name: string) {
  const fixturePath = fileURLToPath(
    new URL(`fixtures/${name}/`, import.meta.url)
  );

  try {
    const { stderr, stdout } = await execFileAsync(
      process.execPath,
      [astroBin, "build"],
      { cwd: fixturePath, env: getBuildEnv() }
    );

    return { output: `${stdout}${stderr}`, status: "success" as const };
  } catch (error) {
    const { stderr = "", stdout = "" } = error as {
      stderr?: string;
      stdout?: string;
    };

    return { output: `${stdout}${stderr}`, status: "error" as const };
  }
}

function getBuildEnv(): NodeJS.ProcessEnv {
  return Object.fromEntries(
    Object.entries(process.env).filter(
      ([key]) => !vitestEnvKeys.has(key) && !key.startsWith("VITEST")
    )
  );
}

export function readFixtureOutput(name: string, path: string) {
  return readFileSync(
    fileURLToPath(new URL(`fixtures/${name}/dist/${path}`, import.meta.url)),
    "utf8"
  );
}

export function getPageTitle(html: string) {
  return html.match(/<h1[^>]*>(.*?)<\/h1>/)?.[1];
}

export function getDocumentTitle(html: string) {
  return html.match(/<title>(.*?)<\/title>/)?.[1];
}

export function getSidebarLinks(html: string) {
  const sidebar =
    html.match(
      /<ul class="top-level[\s\S]*?<\/sl-sidebar-state-persist>/
    )?.[0] ?? "";

  return [
    ...sidebar.matchAll(
      /<a href="([^"]*)"( aria-current="page")?[^>]*><span[^>]*>([^<]*)<\/span>/g
    ),
  ].map(([, href, current, label]) => ({
    href,
    isCurrent: current !== undefined,
    label,
  }));
}

export function getPagination(html: string) {
  return Object.fromEntries(
    [
      ...html.matchAll(
        /<a href="([^"]*)" rel="(prev|next)"[\s\S]*?link-title[^>]*>([^<]*)</g
      ),
    ].map(([, href, rel, label]) => [rel, { href, label }])
  );
}

export function getOverviewCards(html: string) {
  const content =
    html.match(
      /<div class="sl-markdown-content">([\s\S]*?)<\/div>\s*<footer/
    )?.[1] ?? "";

  return [
    ...content.matchAll(
      /<h(\d) id="([^"]*)"[^>]*>\s*([^<]*?)\s*<\/h\d>|<a href="([^"]*)"[^>]*><span class="title[^"]*"[^>]*>([^<]*)<\/span><\/a>(?:<\/span>)?(?:<span class="description[^"]*"[^>]*>([^<]*)<\/span>)?/g
    ),
  ].map(([, level, id, heading, href, title, description]) =>
    level ? { heading, id, level: Number(level) } : { description, href, title }
  );
}

export function hasCardGrid(html: string) {
  return html.includes('class="card-grid');
}
