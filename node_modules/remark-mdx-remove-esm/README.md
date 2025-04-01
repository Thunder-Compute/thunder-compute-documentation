# remark-mdx-remove-esm

[![NPM version][badge-npm-version]][npm-package-url]
[![NPM downloads][badge-npm-download]][npm-package-url]
[![Build][badge-build]][github-workflow-url]
[![codecov](https://codecov.io/gh/ipikuka/remark-mdx-remove-esm/graph/badge.svg?token=U6CFVM0DRE)](https://codecov.io/gh/ipikuka/remark-mdx-remove-esm)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fipikuka%2Fremark-mdx-remove-esm%2Fmaster%2Fpackage.json)](https://github.com/ipikuka/remark-mdx-remove-esm)
[![typescript][badge-typescript]][typescript-url]
[![License][badge-license]][github-license-url]

This package is a [unified][unified] ([remark][remark]) plugin to remove import and/or export statements (`mdxjsEsm`) in MDX documents.

**[unified][unified]** is a project that transforms content with abstract syntax trees (ASTs) using the new parser **[micromark][micromark]**. **[remark][remark]** adds support for markdown to unified. **[mdast][mdast]** is the Markdown Abstract Syntax Tree (AST) which is a specification for representing markdown in a syntax tree.

**This plugin is a remark plugin that removes "mdxjsEsm" type AST nodes in MDX which is parsed via `remark-mdx`.**

## When should I use this?

This plugin `remark-mdx-remove-esm` is useful if you want to remove `import` and / or `export` statements from a MDX document.

## Installation

This package is suitable for ESM only. In Node.js (version 16+), install with npm:

```bash
npm install remark-mdx-remove-esm
```

or

```bash
yarn add remark-mdx-remove-esm
```

## Usage

Say we have the following MDX file, `example.mdx`, which consists some import and export statements.

```markdown
import x from "y";

Hi

export const b = 1;
```

And our module, `example.js`, looks as follows:

```javascript
import { read } from "to-vfile";
import remark from "remark";
import remarkMdx from "remark-mdx";
import gfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkMdxRemoveEsm from "remark-mdx-remove-esm";

main();

async function main() {
  const file = await remark()
    .use(remarkMdx)
    .use(gfm)
    .use(remarkMdxRemoveEsm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(await read("example.mdx"));

  console.log(String(file));
}
```

Now, running `node example.js` you see that the imports and exports have been removed:

```html
<p>Hi</p>
```

Without `remark-mdx-remove-esm`, running of the compiled source would cause the import and export statements work.

## Options

The option can be either `"import"` or `"export"` or array of `("import" | "export")`. 

By default it is `undefined`.

```typescript
type MdxEsmSpecifier = "import" | "export";

type MdxRemoveEsmOptions = MdxEsmSpecifier | MdxEsmSpecifier[];

// removes both export and import statements
use(remarkMdxRemoveEsm);

// removes both export and import statements
use(remarkMdxRemoveEsm, undefined);

// removes ONLY import statements
use(remarkMdxRemoveEsm, "import"); 

// removes ONLY export statements
use(remarkMdxRemoveEsm, "export"); 

// removes ONLY import statements
use(remarkMdxRemoveEsm, ["import"]); 

// removes ONLY export statements
use(remarkMdxRemoveEsm, ["export"]); 

// removes both export and import statements
use(remarkMdxRemoveEsm, ["export", "import"]); 

// DOESN'T remove any statement
use(remarkMdxRemoveEsm, []); 
```

## `clsx` utiliy

The `remark-mdx-remove-esm` exports a small utility function called **`clsx`** to help developers don't need to download the `clsx` package.

The `clsx` has one functionality which is composing **an array of `MdxEsmSpecifier`** for the `remark-mdx-remove-esm`.

It returns 

```javascript
const disableExports: boolean | undefined = true;
const disableImports: boolean | undefined = undefined;

const mdxRemoveEsmOptions = clsx([disableExports && "export", disableImports && "import"]);

// mdxRemoveEsmOptions --> ["export"]

use(remarkMdxRemoveEsm, mdxRemoveEsmOptions); 
```

## Syntax tree

This plugin modifies the `mdast` (markdown abstract syntax tree).

## Types

This package is fully typed with [TypeScript][typescript].

The plugin exports the types `MdxRemoveEsmOptions`, `MdxEsmSpecifier`.

## Compatibility

This plugin works with unified version 6+ and remark version 7+. It is compatible with MDX version 3.

## Security

Use of `remark-mdx-remove-esm` does not involve rehype (hast) or user content so there are no openings for cross-site scripting (XSS) attacks.

## My Plugins

I like to contribute the Unified / Remark / MDX ecosystem, so I recommend you to have a look my plugins.

### My Remark Plugins

- [`remark-flexible-code-titles`](https://www.npmjs.com/package/remark-flexible-code-titles)
  – Remark plugin to add titles or/and containers for the code blocks with customizable properties
- [`remark-flexible-containers`](https://www.npmjs.com/package/remark-flexible-containers)
  – Remark plugin to add custom containers with customizable properties in markdown
- [`remark-ins`](https://www.npmjs.com/package/remark-ins)
  – Remark plugin to add `ins` element in markdown
- [`remark-flexible-paragraphs`](https://www.npmjs.com/package/remark-flexible-paragraphs)
  – Remark plugin to add custom paragraphs with customizable properties in markdown
- [`remark-flexible-markers`](https://www.npmjs.com/package/remark-flexible-markers)
  – Remark plugin to add custom `mark` element with customizable properties in markdown
- [`remark-flexible-toc`](https://www.npmjs.com/package/remark-flexible-toc)
  – Remark plugin to expose the table of contents via `vfile.data` or via an option reference
- [`remark-mdx-remove-esm`](https://www.npmjs.com/package/remark-mdx-remove-esm)
  – Remark plugin to remove import and/or export statements (mdxjsEsm)

### My Rehype Plugins

- [`rehype-pre-language`](https://www.npmjs.com/package/rehype-pre-language)
  – Rehype plugin to add language information as a property to `pre` element

### My Recma Plugins

- [`recma-mdx-escape-missing-components`](https://www.npmjs.com/package/recma-mdx-escape-missing-components)
  – Recma plugin to set the default value `() => null` for the Components in MDX in case of missing or not provided so as not to throw an error
- [`recma-mdx-change-props`](https://www.npmjs.com/package/recma-mdx-change-props)
  – Recma plugin to change the `props` parameter into the `_props` in the `function _createMdxContent(props) {/* */}` in the compiled source in order to be able to use `{props.foo}` like expressions. It is useful for the `next-mdx-remote` or `next-mdx-remote-client` users in `nextjs` applications.

## License

[MIT License](./LICENSE) © ipikuka

### Keywords

🟩 [unified][unifiednpm] 🟩 [remark][remarknpm] 🟩 [remark plugin][remarkpluginnpm] 🟩 [mdast][mdastnpm] 🟩 [markdown][markdownnpm] 🟩 [mdx][mdxnpm] 🟩 [mdxjsEsm][mdxjsesmnpm] 🟩 [remark mdx remove esm][remarkmdxremoveesmnpm]

[unifiednpm]: https://www.npmjs.com/search?q=keywords:unified
[remarknpm]: https://www.npmjs.com/search?q=keywords:remark
[remarkpluginnpm]: https://www.npmjs.com/search?q=keywords:remark%20plugin
[mdastnpm]: https://www.npmjs.com/search?q=keywords:mdast
[markdownnpm]: https://www.npmjs.com/search?q=keywords:markdown
[mdxnpm]: https://www.npmjs.com/search?q=keywords:mdx
[mdxjsesmnpm]: https://www.npmjs.com/search?q=keywords:mdxjsEsm
[remarkmdxremoveesmnpm]: https://www.npmjs.com/search?q=keywords:remark%20mdx%20remove%20esm


[unified]: https://github.com/unifiedjs/unified
[remark]: https://github.com/remarkjs/remark
[remarkplugins]: https://github.com/remarkjs/remark/blob/main/doc/plugins.md
[mdast]: https://github.com/syntax-tree/mdast
[micromark]: https://github.com/micromark/micromark
[typescript]: https://www.typescriptlang.org/

[badge-npm-version]: https://img.shields.io/npm/v/remark-mdx-remove-esm
[badge-npm-download]:https://img.shields.io/npm/dt/remark-mdx-remove-esm
[npm-package-url]: https://www.npmjs.com/package/remark-mdx-remove-esm

[badge-license]: https://img.shields.io/github/license/ipikuka/remark-mdx-remove-esm
[github-license-url]: https://github.com/ipikuka/remark-mdx-remove-esm/blob/main/LICENSE

[badge-build]: https://github.com/ipikuka/remark-mdx-remove-esm/actions/workflows/publish.yml/badge.svg
[github-workflow-url]: https://github.com/ipikuka/remark-mdx-remove-esm/actions/workflows/publish.yml

[badge-typescript]: https://img.shields.io/npm/types/remark-mdx-remove-esm
[typescript-url]: https://www.typescriptlang.org/