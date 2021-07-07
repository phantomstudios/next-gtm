import React from "react";

import TestRenderer from "react-test-renderer";

import { trackEvent, TrackingHeadScript } from "../src";
import { IS_BROWSER } from "../src/utils/platform";

describe("<TrackingHeadScript />", () => {
  it("doesn't render component if no ID", async () => {
    const renderer = TestRenderer.create(<TrackingHeadScript />);
    expect(renderer.toJSON()).toEqual(null);
  });
});

describe("trackEvent()", () => {
  beforeEach(() => {
    if (IS_BROWSER) window.dataLayer = [];
  });

  it("adds tracking event to dataLayer", async () => {
    if (!IS_BROWSER) return;

    const event = "customEvent";
    const data = {
      name: "name",
      category: "category",
      action: "action",
      label: "label",
    };
    trackEvent({ event, data });

    expect(window.dataLayer[0]).toEqual({ event, ...data });
  });

  it("defaults event to customEvent if left undefined", async () => {
    if (!IS_BROWSER) return;

    const data = {
      name: "name",
      category: "category",
      action: "action",
      label: "label",
    };
    trackEvent({ data });

    expect(window.dataLayer[0]).toEqual({ event: "customEvent", ...data });
  });

  it("doesn't break build if tracking event empty", async () => {
    if (!IS_BROWSER) return;

    trackEvent();

    expect(window.dataLayer).toHaveLength(1);
  });
});
