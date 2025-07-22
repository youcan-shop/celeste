# Celeste

[![npm version](https://img.shields.io/npm/v/@youcan/celeste.svg?label=@youcan/celeste)](https://www.npmjs.com/package/@youcan/celeste)
[![CI](https://github.com/youcan-shop/celeste/workflows/Build/badge.svg)](https://github.com/youcan-shop/celeste/actions?query=branch%3Amain)
[![storybook](https://shields.io/badge/storybook-grey?logo=storybook&style=flat)](https://main--677f37bbe9cfbdfdf743f0ab.chromatic.com)

## About this repo

The @youcan/celeste repo is a monorepo made up of NPM packages.

```sh
celeste/
├── celeste-tokens              # Design tokens for Celeste
├── celeste-icons               # Icons for Celeste
└── celeste-vue                 # Vue 3 components based on the Celeste DS
```

## Commands

### Getting started

```sh
pnpm i && pnpm build
```

### All commands

| Command          | Runs                                                            |
| ---------------- | --------------------------------------------------------------- |
| `pnpm lint`      | Lints all workspaces                                            |
| `pnpm build`     | Builds all packages                                             |
| `pnpm storybook` | Runs storybook for the @youcan/celeste-vue package              |
| `pnpm release`   | Tags a new release, writes a changelog, and publishes it on NPM |

## Contributing

We don't have contribution guidelines just yet, but pull requests are very much welcome.

## Licenses

Source code is under a [custom license](https://github.com/youcan-shop/celeste/blob/main/LICENSE) based on MIT. The license restricts Celeste usage to applications that integrate or interoperate with YouCan software or services, with additional restrictions for external, stand-alone applications.
