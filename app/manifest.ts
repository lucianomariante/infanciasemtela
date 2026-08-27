import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Infância Sem Tela",
    short_name: "Sem Tela",
    description:
      "Guias práticos para escolher brinquedos, presentes e ideias sem tela para crianças.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f0",
    theme_color: "#0f766e",
  };
}
