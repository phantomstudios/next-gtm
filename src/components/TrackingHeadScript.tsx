import React from "react";

import { EmbedTrackingProps } from "@phntms/react-gtm";
import Script from "next/script";

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
