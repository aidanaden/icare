/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    loader: "custom",
    imageSizes: [256],
    deviceSizes: [640, 1080, 1920],
    nextImageExportOptimizer: {
      imageFolderPath: "public/images",
      exportFolderPath: "out",
      quality: 75,
    },
  },
  env: {
    storePicturesInWEBP: true,
    generateAndUseBlurImages: true,
    FORGET_API_URL: process.env.FORGET_API_URL,
    BASE_API_URL: process.env.BASE_API_URL,
  },
  staticPageGenerationTimeout: 1000,
};

module.exports = nextConfig;
