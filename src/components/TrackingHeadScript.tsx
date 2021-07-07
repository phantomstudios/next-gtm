import React from "react";

import Script from "next/script";

import { EmbedTrackingProps } from "../types";

const TrackingHeadScript = ({ id }: EmbedTrackingProps) => (
  <>
    {id && (
      <>
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        />
        <Script strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', '${id}', { page_path: window.location.pathname });
          `}
        </Script>
      </>
    )}
  </>
);

export default TrackingHeadScript;
