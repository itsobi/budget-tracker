export default {
  providers: [
    {
      domain:
        process.env.NODE_ENV === 'development'
          ? process.env.NEXT_PUBLIC_DEV_CONVEX_SITE_URL
          : process.env.NEXT_PUBLIC_CONVEX_URL,
      applicationID: 'convex',
    },
  ],
};
