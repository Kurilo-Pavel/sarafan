/** @type {import('next').NextConfig} */
import {FrontendURL} from "./app/constants.js"

const nextConfig = {
  async headers() {
    return [
      {
        source: "/*",
        headers: [
          {key: "Access-Control-Allow-Credentials", value: "true"},
          {key: "Access-Control-Allow-Origin", value: `${FrontendURL}`},
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
