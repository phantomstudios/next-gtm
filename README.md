# @phntms/next-gtm

[![NPM version][npm-image]][npm-url]
[![Actions Status][ci-image]][ci-url]
[![PR Welcome][npm-downloads-image]][npm-downloads-url]

A lightweight Next library to implement custom Google Tag Manager events.

## Introduction

Extends [@phntms/react-gtm](https://www.npmjs.com/package/@phntms/react-gtm) with native support for [Next.JS 12](https://nextjs.org/blog/next-12), utilizing the new Script Component to **automatically prioritize loading of third-party scripts to improve performance**.

## Installation

Install this package with `npm`.

```bash
npm i @phntms/next-gtm
```

## Usage

### &lt;TrackingHeadScript />

| Property       | Type      | Default   | Notes                                                                                                     |
| -------------- | --------- | --------- | --------------------------------------------------------------------------------------------------------- |
| **id**         | `string`  | undefined | ID that uniquely identifies GTM Container. Example format: `GTM-xxxxxx`.                                  |
| **disable**    | `boolean` | false     | Used to disable tracking events. Use if you want user to consent to being tracked before tracking events. |
| **isGTM**      | `boolean` | false     | Loads the gtag.js script by default (legacy behaviour - compatible with UA/GA4/GTM), else, loads gtm.js.  |
| **GTMAuth**    | `string`  | undefined | (isGTM = true required) Optional parameter to load a non-default GTM environment, e.g. for testing GTM.   |
| **GTMPreview** | `string`  | undefined | (isGTM = true required) Optional parameter to load a non-default GTM environment, e.g. for testing GTM.   |

To initialize GTM, add `TrackingHeadScript` to the `head` of the page.

This package utilizes [next/script](https://nextjs.org/docs/basic-features/script), which means you **can't** place it inside a `next/head`. Further, `TrackingHeadScript` should not be used in `pages/_document.js` as `next/script` has client-side functionality to ensure loading order.

The `isGTM`, `GTMAuth` and `GTMPreview` optional properties are a backwards-compatible update to provide multiple GTM environment support to this library. Using multiple GTM container environments allow developers to test different GTM config versions on a preview codebase before publishing the change to the production GTM container.

- If the project is known to be using GTM - the `isGTM` should be set to `true` regardless of the environment (the default `false` will continue to function though).
- Typically you want to set the `GTMAuth` and `GTMPreview` properties (obtained from the GTM preview environment script snippet) via optional environment variables in the applications' preview environments - when left as undefined - GTM will default to the master (production) container config.

Example usage:

```JSX
import type { AppProps } from "next/app";
import { TrackingHeadScript } from "@phntms/next-gtm";

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || "";

const App = ({ Component }: AppProps) => (
  <>
    <TrackingHeadScript id={GA_TRACKING_ID} isGTM={true} />
    <Component />
  </>
);

export default App;
```

**Note**: If used alongside any cookie consent scripts, `<TrackingHeadScript />` must be loaded after.

### Using trackEvent() and enableTracking()

For how to use `trackEvent()`, `enableTracking()`, learn more about `EventDataProps` and how this library extends `window.dataLayer`, please reference [@phntms/react-gtm](https://www.npmjs.com/package/@phntms/react-gtm).

## 🍰 Contributing

Want to get involved, or found an issue? Please contribute using the GitHub Flow. Create a branch, add commits, and open a Pull Request or submit a new issue.

Please read `CONTRIBUTING` for details on our `CODE_OF_CONDUCT`, and the process for submitting pull requests to us!

[npm-image]: https://img.shields.io/npm/v/@phntms/next-gtm.svg?style=flat-square&logo=react
[npm-url]: https://npmjs.org/package/@phntms/next-gtm
[npm-downloads-image]: https://img.shields.io/npm/dm/@phntms/next-gtm.svg
[npm-downloads-url]: https://npmcharts.com/compare/@phntms/next-gtm?minimal=true
[ci-image]: https://github.com/phantomstudios/next-gtm/workflows/Test/badge.svg
[ci-url]: https://github.com/phantomstudios/next-gtm/actions
