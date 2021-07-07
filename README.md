# @phntms/next-gtm

[![NPM version][npm-image]][npm-url]
[![Actions Status][ci-image]][ci-url]
[![PR Welcome][npm-downloads-image]][npm-downloads-url]

A lightweight Next library to implement custom Google Tag Manager events.

## Introduction

Based on [@phntms/react-gtm](https://www.npmjs.com/package/@phntms/react-gtm) with native support for [Next.JS 11](https://nextjs.org/blog/next-11), utilizing the new Script Component to **automatically prioritize loading of third-party scripts to improve performance**. Designed to use and extend [GTM](https://developers.google.com/tag-manager/quickstart) snippets.

## Installation

Install this package with `npm`.

```bash
npm i @phntms/NEXT-gtm
```

## Usage

### &lt;TrackingHeadScript />

| Property | Type     | Default   | Required | Notes                                                                           |
| -------- | -------- | --------- | -------- | ------------------------------------------------------------------------------- |
| **id**   | `string` | undefined | **Yes**  | ID that uniquely identifies GTM Container. Will be in the format; `GTM-xxxxxx`. |

To initialize GTM, add `TrackingHeadScript` to the `head` of the page.

Example usage:

```JSX
import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import { TrackingHeadScript, TrackingBodyScript } from "@phntms/next-gtm";

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || "";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <TrackingHeadScript id={GA_TRACKING_ID} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

**Note**: If used alongside any cookie consent scripts, `<TrackingHeadScript />` must be placed after.

### trackEvent()

| Parameter | Type                 | Default   | Required | Notes                                           |
| --------- | -------------------- | --------- | -------- | ----------------------------------------------- |
| props     | `EventTrackingProps` | undefined | No       | Custom tracking event to push to GTM container. |

Example of a basic tracking event:

```javascript
import { trackEvent } from "@phntms/next-gtm";

trackEvent({
  event: "customEvent",
  data: {
    name: "CTA - To External",
    category: "CTA",
    action: "To: https://phantom.land/",
    label: "Click",
  },
});
```

### EventDataProps

| Parameter | Type             | Default       | Required | Notes                                                                                                                                             |
| --------- | ---------------- | ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| event     | `string`         | "customEvent" | No       | Custom GTM event name, defaults to `customEvent`.                                                                                                 |
| data      | `EventDataProps` | undefined     | No       | Supports any value(s) in the format `[key: string]: any`. Example of recommended properties to include; `name`, `category`, `action` and `label`. |

### window.dataLayer

This library extends `window` and exposes the `window.dataLayer` GTM container object.

## Further Resources

Useful resource for implementing custom GTM events:

- [Omnibug](https://chrome.google.com/webstore/detail/omnibug/bknpehncffejahipecakbfkomebjmokl?hl=en) - Chrome browser extension to decode and display outgoing GTM events from within Inspect Element.

## 🍰 Contributing

Want to get involved, or found an issue? Please contribute using the GitHub Flow. Create a branch, add commits, and open a Pull Request or submit a new issue.

Please read `CONTRIBUTING` for details on our `CODE_OF_CONDUCT`, and the process for submitting pull requests to us!

[npm-image]: https://img.shields.io/npm/v/@phntms/next-gtm.svg?style=flat-square&logo=react
[npm-url]: https://npmjs.org/package/@phntms/next-gtm
[npm-downloads-image]: https://img.shields.io/npm/dm/@phntms/next-gtm.svg
[npm-downloads-url]: https://npmcharts.com/compare/@phntms/next-gtm?minimal=true
[ci-image]: https://github.com/phantomstudios/gtm/workflows/Test/badge.svg
[ci-url]: https://github.com/phantomstudios/gtm/actions
