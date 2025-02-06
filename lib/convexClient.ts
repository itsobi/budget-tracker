import { ConvexHttpClient } from 'convex/browser';

export const getConvexClient = () => {
  return new ConvexHttpClient(
    process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_DEV_CONVEX_URL!
      : process.env.NEXT_PUBLIC_CONVEX_URL!
  );
};
