/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const env = {
  SUPPLIER_URL: "http://localhost:5001/supplier",
  SUPPLIER_URL_TEST: "http://localhost:8001"
}

module.exports = {
  nextConfig,
  env
}
