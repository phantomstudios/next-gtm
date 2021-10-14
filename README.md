# @phntms/next-gtm

[![NPM version][npm-image]][npm-url]
[![Actions Status][ci-image]][ci-url]
[![PR Welcome][npm-downloads-image]][npm-downloads-url]

A lightweight Next library to implement custom Google Tag Manager events.

## Introduction

Extends [@phntms/react-gtm](https://www.npmjs.com/package/@phntms/react-gtm) with native support for [Next.JS 11](https://nextjs.org/blog/next-11), utilizing the new Script Component to **automatically prioritize loading of third-party scripts to improve performance**.

## Installation

Install this package with `npm`.

```bash
npm i @phntms/next-gtm
```

## Usage

### &lt;TrackingHeadScript />

| Property    | Type      | Default   | Required                                                                                                  | Notes                                                                           |
| ----------- | --------- | --------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **id**      | `string`  | undefined | **Yes**                                                                                                   | ID that uniquely identifies GTM Container. Will be in the format; `GTM-xxxxxx`. |
| **disable** | `boolean` | false     | Used to disable tracking events. Use if you want user to consent to being tracked before tracking events. |

To initialize GTM, add `TrackingHeadScript` to the `head` of the page.

This package utilizes [next/script](https://nextjs.org/docs/basic-features/script), which means you **can't** place it inside a `next/head`. Further, `TrackingHeadScript` should not be used in `pages/_document.js` as `next/script` has client-side functionality to ensure loading order.

Example usage:

```JSX
import type { AppProps } from "next/app";
import { TrackingHeadScript } from "@phntms/next-gtm";

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || "";

const App = ({ Component }: AppProps) => (
  <>
    <TrackingHeadScript id={GA_TRACKING_ID} />
    <Component />
  </>
);

export default App;
```

**Note**: If used alongside any cookie consent scripts, `<TrackingHeadScript />` must be loaded after.

### enableTracking()

| Parameter  | Type      | Default   | Notes                                                               |
| ---------- | --------- | --------- | ------------------------------------------------------------------- |
| **id**     | `string`  | undefined | Same ID used in `TrackingHeadScript`. Example format: `GTM-xxxxxx`. |
| **enable** | `boolean` | true      | Used to enable or disable tracking events.                          |

**Note**: This _should_ only be used if needed, for example after user has consented to being tracked. You _shouldn't_ need to toggle this in normal usage.

### Using trackEvent()

For how to use `trackEvent()`, learn more about `EventDataProps` and how this library extends `window.dataLayer`, please reference [@phntms/react-gtm](https://www.npmjs.com/package/@phntms/react-gtm).

## 🍰 Contributing

Want to get involved, or found an issue? Please contribute using the GitHub Flow. Create a branch, add commits, and open a Pull Request or submit a new issue.

Please read `CONTRIBUTING` for details on our `CODE_OF_CONDUCT`, and the process for submitting pull requests to us!

[npm-image]: https://img.shields.io/npm/v/@phntms/next-gtm.svg?style=flat-square&logo=react
[npm-url]: https://npmjs.org/package/@phntms/next-gtm
[npm-downloads-image]: https://img.shields.io/npm/dm/@phntms/next-gtm.svg
[npm-downloads-url]: https://npmcharts.com/compare/@phntms/next-gtm?minimal=true
[ci-image]: https://github.com/phantomstudios/next-gtm/workflows/Test/badge.svg
[ci-url]: https://github.com/phantomstudios/next-gtm/actions
