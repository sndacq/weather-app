/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    AUTH_0_DOMAIN: "yourAuth0AppDomain",
    AUTH_0_CLIENT: "yorAuth0AppClient",
  }
}

module.exports = nextConfig
