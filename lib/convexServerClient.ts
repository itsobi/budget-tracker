import { ConvexHttpClient } from 'convex/browser';

export const getConvexServerClient = () => {
  return new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
};
