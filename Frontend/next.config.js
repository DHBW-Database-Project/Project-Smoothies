/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const env = {
  SUPPLIER_URL: "http://localhost:5001/supplier",
  SUPPLIER_URL_TEST: "http://localhost:8001",
  TEST_URL: "http://localhost:5001/",
  CUSTOMER_URL: "http://localhost:5001/customer",
  PRODUCT_URL: "http://localhost:5001/product",
  INGREDIENT_URL: "http://localhost:5001/ingredient",
  CATEGORY_URL: "http://localhost:5001/category",
  ORDER_URL: "http://localhost:5001/orders",
  RECIPE_URL: "http://localhost:5001/recipe",
}

module.exports = {
  nextConfig,
  env
}
