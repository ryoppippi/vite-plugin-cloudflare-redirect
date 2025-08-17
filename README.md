# vite-plugin-cloudflare-redirect

Vite plugin to handle Cloudflare's \_redirects file following https://developers.cloudflare.com/pages/platform/redirects/.

[![npm version](https://img.shields.io/npm/v/@ryoppippi/vite-plugin-cloudflare-redirect)](https://www.npmjs.com/package/@ryoppippi/vite-plugin-cloudflare-redirect)
[![npm downloads](https://img.shields.io/npm/dm/@ryoppippi/vite-plugin-cloudflare-redirect)](https://www.npmjs.com/package/@ryoppippi/vite-plugin-cloudflare-redirect)
[![install size](https://packagephobia.com/badge?p=@ryoppippi/vite-plugin-cloudflare-redirect)](https://packagephobia.com/result?p=@ryoppippi/vite-plugin-cloudflare-redirect)
[![license](https://img.shields.io/npm/l/@ryoppippi/vite-plugin-cloudflare-redirect)](https://github.com/ryoppippi/vite-plugin-cloudflare-redirect/blob/main/LICENSE)

[![JSR](https://jsr.io/badges/@ryoppippi/vite-plugin-cloudflare-redirect)](https://jsr.io/@ryoppippi/vite-plugin-cloudflare-redirect)
[![JSR](https://jsr.io/badges/@ryoppippi/vite-plugin-cloudflare-redirect/score)](https://jsr.io/@ryoppippi/vite-plugin-cloudflare-redirect)

## Usage

### parse mode
Parse a `_redirects` file at `/public` (or following the `publicDir` config) like this:

```ini
# /public/_redirects
/foo https://example.com 302
```

```js
// vite.config.js
import { defineConfig } from 'vite'
import { cloudflareRedirect } from '@ryoppippi/vite-plugin-cloudflare-redirect'

export default defineConfig({
    plugins: [
        cloudflareRedirect({
            mode: "parse",
            redirectsFilePath: './custom/_redirects' // optional. If not specified, this plugin parses the default public or static directory from vite config.
        })
    ]
})
```

By default if no options are passed, the plugin would try to load from `/public/_redirects` (from `publicDir` config). If the file isn't found, no redirects will happen. Pass the `redirectsFile` option to specify a custom path.

### generate mode

Generate a `_redirects` file to `/public` (or following the `publicDir` config) from the `entries` option.

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { cloudflareRedirect } from '@ryoppippi/vite-plugin-cloudflare-redirect'

export default defineConfig({
    plugins: [
        cloudflareRedirect({
            mode: "generate",
            redirectsFilePath: './public/_redirects', // optional
            entries: [
                { from: '/foo', to: 'https://example.com', status: 302 },
                // ...
            ]
        })
    ],
})
```


## License
MIT
