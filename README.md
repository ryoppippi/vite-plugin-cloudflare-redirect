# vite-plugin-cloudflare-redirect

Vite plugin to handle Cloudflare's \_redirects file following https://developers.cloudflare.com/pages/platform/redirects/.

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
            redirectsFile: './custom/_redirects' // optional
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
            redirectsFile: './public/_redirects', // optional
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
