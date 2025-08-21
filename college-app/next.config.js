// import withImages from "next-images";

const nextConfig = {
  // async redirects() {
  //   return [
  //     {
  //       source: "/.well-known/:file",
  //       destination: "/api/.well-known/:file",
  //       permanent: false,
  //     },
  //   ];
  // },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "flagcdn.com",
      "cdn.freebiesupply.com",
      "ucarecdn.com",
      "maps.googleapis.com",
      "terminal-static-file.s3.amazonaws.com",
      "github.com",
      "uploads-ssl.webflow.com",
      "www.youtube.com",
      "www.youtube-nocookie.com",
      "via.placeholder.com",
    ],
  },
};

module.exports = nextConfig;
