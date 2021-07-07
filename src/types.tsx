export interface EmbedTrackingProps {
  id?: string;
}

export interface EventTrackingProps {
  event?: string;
  data?: EventDataProps;
}

export interface EventDataProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
