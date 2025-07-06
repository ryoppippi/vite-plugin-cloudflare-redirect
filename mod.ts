import fs from "node:fs/promises";
import path from "node:path";
import { defu } from "defu";
import { createRedirect, type RedirectEntry } from "cloudflare-redirect-parser";
import type { Plugin, ViteDevServer } from "vite";

/**
 * options
 */
export interface Options {
  /** whether to generate `_redirects` file */
  mode?: "generate" | "parse";

  /**
   * path to the `_redirects` file
   * if not specified, this plugin parses the default public or static directory from vite config.
   */
  redirectsFilePath?: string;

  /** path to the `_redirects` file */
  entries?: RedirectEntry[];
}

const DEFAULT_OPTIONS = ({
  mode: "generate",
  entries: [],
}) as const satisfies Options;

type Middleware = ViteDevServer["middlewares"]["handle"];

/**
 * generate `_redirects` file content from entries
 */
function generateRedirect(entries: RedirectEntry[]) {
  let content = "";

  for (const entry of entries) {
    const { from, to, status = 301 } = entry;
    content += `${encodeURI(from)} ${encodeURI(to)} ${status}\n`;
  }

  return content;
}

export function cloudflareRedirect(options: Options = {}): Plugin {
  let middleware: Middleware;

  return {
    name: "vite-plugin-cloudflare-redirect",

    async configResolved(config) {
      const resolvedOptions = defu(options, DEFAULT_OPTIONS);

      /* resolve redirects file path */
      const redirectFilePath = resolvedOptions.redirectsFilePath != null
        ? path.resolve(resolvedOptions.redirectsFilePath)
        : path.resolve(config.publicDir, "_redirects");

      /* parse or generate content */
      let content: string;
      switch (resolvedOptions.mode) {
        case "generate":
          content = generateRedirect(resolvedOptions.entries);
          break;
        case "parse":
          content = await fs.readFile(redirectFilePath, "utf-8");
          break;
        default:
          return resolvedOptions.mode satisfies never;
      }

      /* if content is empty, return */
      if (content === "") return;

      /* if mode is generate, write to file */
      if (resolvedOptions.mode === "generate") {
        await fs.writeFile(redirectFilePath, content);
      }

      const redirect = createRedirect(content);

      middleware = (req, res, next) => {
        if (req.url) {
          const redirected = redirect(req.url);
          if (redirected) {
            res.writeHead(redirected.status, { location: redirected.to });
            res.end();
            return;
          }
          next();
        }
      };
    },

    configureServer(server) {
      if (middleware != null) {
        server.middlewares.use(middleware);
      }
    },
    configurePreviewServer(server) {
      if (middleware != null) {
        server.middlewares.use(middleware);
      }
    },
  };
}
