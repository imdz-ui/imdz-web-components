# @imdz/web-components

The imdz components as Web Components (`<imdz-button>`, `<imdz-dialog>`…).
They work in any framework or in plain HTML.

```sh
npm i @imdz/web-components
```

```js
import "@imdz/web-components";
```

```html
<imdz-button variant="secondary">Save</imdz-button>
```

Same components and same CSS as [`@imdz/react`](https://www.npmjs.com/package/@imdz/react):
both take it from `@imdz/styles`.

## Development

`npm run dev` regenerates the styles when the CSS of `@imdz/styles` changes
(link it with `npm link @imdz/styles`). The components in `src/` are plain
JavaScript with Lit: there's no compile step, `src/` is what gets published.
