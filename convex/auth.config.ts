export default {
  providers: [
    {
      domain:
        process.env.NODE_ENV === 'development'
          ? process.env.DEV_CONVEX_SITE_URL
          : process.env.CONVEX_SITE_URL,
      applicationID: 'convex',
    },
  ],
};
