/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  publicRuntimeConfig: {
    googleApiKey: process.env.googleApiKey,
  },
};
