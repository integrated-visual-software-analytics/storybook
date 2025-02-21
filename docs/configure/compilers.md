---
title: 'Compiler support'
---

Javascript compilers are essential in optimizing and transforming code, enhancing performance, and ensuring compatibility across different environments. Storybook provides support for the leading compilers, ensuring lightning-fast build time and execution with [SWC](https://swc.rs/) or leveraging [Babel](https://babeljs.io/) with its extensive ecosystem of plugins and presets to allow you to use the latest features of the ecosystem with minimal configuration required for your Webpack-based project.

## SWC

SWC is a fast, highly extensible tool for compiling and bundling modern JavaScript applications. Powered by [Rust](https://www.rust-lang.org/), it improves performance and reduces build times. Storybook includes a built-in integration with SWC, allowing zero-configuration setup and built-in types for APIs. If you've initialized Storybook in a Webpack-based project with any of the supported [frameworks](./frameworks.md), except Angular, it will automatically use SWC as its default, providing you with faster loading time. However, if you're upgrading from a previous version of Storybook, you may need to opt-in to use SWC by adjusting your Storybook configuration file (i.e., `.storybook/main.js|ts`) as follows:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/main-config-framework-options-builder-use-swc.js.mdx',
    'common/main-config-framework-options-builder-use-swc.ts.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

<Callout variant="info">

Support for the SWC builder is currently experimental for Next.js projects, and it's not enabled by default. It requires you to opt in to use it. For more information on configuring SWC with the supported frameworks, see the [SWC API](../api/main-config-swc.md) documentation.

</Callout>

## Babel

Babel is a widely adopted JavaScript compiler providing a modular architecture and extensive plugin system to support a wide range of use cases, enabling access to the cutting-edge features of the tooling ecosystem. Storybook provides a seamless integration with Babel, allowing you to share a standard setup between your project and Storybook without any additional configuration.

<Callout variant="info">

If you're not using Storybook 7, please reference the [previous documentation](../../../release-6-5/docs/configure/babel.md) for guidance on configuring your Babel setup.

</Callout>

### Configure

By default, Babel provides an opinionated [configuration](https://babeljs.io/docs/config-files) that works for most projects, relying on two distinct methods for configuring projects with the tool:

- **Project-wide configuration**: Babel will look for a `babel.config.js` or equivalent file in the root of your project and use it to configure your project's Babel setup.
- **File-relative configuration**: Babel will look for a `.babelrc.json` or equivalent file, introspecting the project structure until it finds a configuration file. This will allow you to configure Babel individually for multiple aspects of your project.

Storybook relies on an agnostic approach to configuring Babel, enabling you to provide the necessary configuration for your project, and it will use it. Based on the supported frameworks, builders, and addons, it may include minor adjustments to ensure compatibility with Storybook's features. If you need to provide a custom configuration, you can generate a `.babelrc.json` file by running the following command:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/storybook-cli-babelrc-file.yarn.mdx',
    'common/storybook-cli-babelrc-file.npm.mdx',
    'common/storybook-cli-babelrc-file.pnpm.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

When the command runs, it will prompt you to install additional packages and generate a `.babelrc.json` file in the current working directory of your project and apply it, assuming that you're using the default configuration and co-locating your Storybook stories in the current working directory of your project.

<details>
<summary>Example Babel configuration</summary>

```json
{
  "sourceType": "unambiguous",
  "presets": [
    [
      "@babel/preset-env",
      {
        "shippedProposals": true,
        "loose": true
      }
    ],
    "@babel/preset-typescript"
  ],
  "plugins": [
    "@babel/plugin-transform-shorthand-properties",
    "@babel/plugin-transform-block-scoping",
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ],
    [
      "@babel/plugin-proposal-private-methods",
      {
        "loose": true
      }
    ],
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-syntax-dynamic-import",
    [
      "@babel/plugin-proposal-object-rest-spread",
      {
        "loose": true,
        "useBuiltIns": true
      }
    ],
    "@babel/plugin-transform-classes",
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-transform-parameters",
    "@babel/plugin-transform-destructuring",
    "@babel/plugin-transform-spread",
    "@babel/plugin-transform-for-of",
    "babel-plugin-macros",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    [
      "babel-plugin-polyfill-corejs3",
      {
        "method": "usage-global",
        "absoluteImports": "core-js",
        "version": "3.18.3"
      }
    ]
  ]
}
```

</details>

<Callout variant="info">

For custom project configurations such as monorepos, where you have multiple Storybook configurations, creating a `.babelrc.json` file in your project's current working directory may not be sufficient. In those cases, you can create a `babel.config.js` file to override Babel's configuration, and Storybook will automatically detect and use it. See the Babel [documentation](https://babeljs.io/docs/config-files) for more information.

</Callout>

### Working with Create React App

If you're working with a project that was initialized with [Create React App](https://create-react-app.dev/), Storybook will automatically detect and use the Babel configuration provided by the tool enabled via the `@storybook/preset-create-react-app` preset, allowing to use Storybook without any additional configuration.

## Troubleshooting

<IfRenderer renderer='react'>

### The SWC compiler doesn't work with React

If you have enabled the SWC builder option in a React-based project and you are not explicitly importing React in your `jsx|tsx` files, it can cause Storybook to fail to load. SWC does not automatically import the `jsx-runtime` module when using the SWC builder. To resolve this issue, you need to adjust your Storybook configuration file (i.e., `.storybook/main.js|ts`) and configure the `swc` option as follows:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/main-config-swc-jsx-transform.js.mdx',
    'common/main-config-swc-jsx-transform.ts.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

</IfRenderer>

### Babel configuration not working

Out of the box, Storybook can detect and apply any Babel configuration you provided in your project. However, if you're running into a situation where your configuration is not being used, you configure the [`BABEL_SHOW_CONFIG_FOR`](https://babeljs.io/docs/configuration#print-effective-configs) environment variable and set it to the file you want to inspect. For example:

```sh
BABEL_SHOW_CONFIG_FOR=.storybook/preview.js yarn storybook
```

When the command runs, it will output the Babel configuration applied to the file you specified despite showing a transpilation error in the console and preventing Storybook from loading. This is a known issue with Babel unrelated to Storybook, which you address by turning off the environment variable after inspecting the configuration and restarting Storybook.
