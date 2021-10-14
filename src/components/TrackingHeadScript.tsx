import React from "react";

import { EmbedTrackingProps } from "@phntms/react-gtm";
import Script from "next/script";

const TrackingHeadScript = ({ id, disable = false }: EmbedTrackingProps) => (
  <>
    {id && (
      <>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        />
        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              window['ga-disable-${id}'] = ${disable.toString()};

              function gtag() { dataLayer.push(arguments); }
              gtag('js', new Date());
              gtag('config', '${id}', { page_path: window.location.pathname });
            `,
          }}
        />
      </>
    )}
  </>
);

export default TrackingHeadScript;
