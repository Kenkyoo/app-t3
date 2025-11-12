/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
	module.exports = {
  images: {
    remotePatterns: [new URL('cdn.dummyjson.com')],
  },
}
};

export default config;
