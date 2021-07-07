import { EventTrackingProps, EventDataProps } from "../types";
import { IS_BROWSER } from "./platform";

declare global {
  interface Window {
    dataLayer: EventDataProps[];
  }
}

const trackEvent = (props?: EventTrackingProps) => {
  if (!IS_BROWSER || !window.dataLayer) return;

  const event = !props?.event ? "customEvent" : props?.event;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...props?.data });
};

export default trackEvent;
