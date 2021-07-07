import React from "react";

import TestRenderer from "react-test-renderer";

import { TrackingHeadScript } from "../src";

describe("<TrackingHeadScript />", () => {
  it("doesn't render component if no ID", async () => {
    const renderer = TestRenderer.create(<TrackingHeadScript />);
    expect(renderer.toJSON()).toEqual(null);
  });
});
