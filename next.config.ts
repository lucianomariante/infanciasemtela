import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [2, 3, 4, 5].flatMap((age) =>
      ["", "/melhores"].map((prefix) => ({
        source: `${prefix}/melhor-brinquedo-para-${age}-anos`,
        destination: `/brinquedo-para-crianca-de-${age}-anos`,
        permanent: true,
      })),
    );
  },
};

export default nextConfig;
