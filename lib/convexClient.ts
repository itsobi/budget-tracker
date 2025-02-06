import { ConvexHttpClient } from 'convex/browser';

export const getConvexClient = () => {
  return new ConvexHttpClient(
    process.env.NODE_ENV === 'development'
      ? process.env.DEV_NEXT_PUBLIC_CONVEX_URL!
      : process.env.NEXT_PUBLIC_CONVEX_URL!
  );
};
