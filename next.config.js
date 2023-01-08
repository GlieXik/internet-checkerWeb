/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    URL: "https://stormy-springs-30292.herokuapp.com",

    // URL: "https://api-checker-internet-hnje0coea-gliexik.vercel.app",
    // URL: "https://google.com",
    // URL: "http://localhost:5051",
  },
};

module.exports = nextConfig;
