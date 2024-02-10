/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      stream: false,
      constants: false,
    };
    return config;
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#3A606E",
          secondary: "#f6d860",
          accent: "#7CFEF0",
          flax: "#F9E784",
          "mimi-pink": "#FFD6E0",
          neutral: "#EBEBEB",
        },
      },
    ],
  },
};

module.exports = nextConfig;
