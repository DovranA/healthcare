import createNextIntlPlugin from "next-intl/plugin";
// import { withSentryConfig } from "@sentry/nextjs";
/** @type {import('next').NextConfig} */
const nextConfig = {
  // i18n: {
  //   localeDetection: false,
  // },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
