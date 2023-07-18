import React from "react";

import Script from "next/script";

export interface EmbedTrackingProps {
  id?: string;
  disable?: boolean;
  isGTM?: boolean;
  GTMAuth?: string;
  GTMPreview?: string;
}

const TrackingHeadScript = ({
  id,
  disable = false,
  isGTM = false,
  GTMAuth = "",
  GTMPreview = "",
}: EmbedTrackingProps) => (
  <>
    {id &&
      (!isGTM ? (
        <>
          <Script
            id="gtag"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
          />
          <Script
            id="gtag-datalayer"
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
      ) : !GTMAuth || !GTMPreview ? (
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${id}');`,
          }}
        />
      ) : (
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=${GTMAuth}&gtm_preview=${GTMPreview}&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${id}');`,
          }}
        />
      ))}
  </>
);

export default TrackingHeadScript;
