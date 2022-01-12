/** @type {import('next').NextConfig} */

console.log(`process.env.GOOGLE_API_KEY`, process.env.GOOGLE_API_KEY);
module.exports = {
  reactStrictMode: true,
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  publicRuntimeConfig: {
    googleApiKey: process.env.GOOGLE_API_KEY,
  },
};
