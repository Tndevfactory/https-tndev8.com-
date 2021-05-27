/** @format */
let url = "";
let domain = "";
const env = process.env.NODE_ENV;
if (env == "development") {
  url = "http://127.0.0.1:8000/api";
  d = "http://localhost:8000";
  // d = "https://tndev3.tn-devfactory.com";
} else if (env == "production") {
  url = "https://tndev3.tn-devfactory.com/api";
  d = "https://tndev3.tn-devfactory.com";
}
//
const path = require("path");
module.exports = {
  env: {
    BASE_URL: url,
    DOMAIN: d,
  },
  images: {
    domains: ["localhost", "tndev3.tn-devfactory.com"],
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /.mp3$/,
      use: {
        loader: "file-loader",
      },
    });
    return config;
  },
};
