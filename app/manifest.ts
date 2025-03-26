import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "벚꽃 명소 지도",
    short_name: "벚꽃 지도",
    description: "경기도 광주 벚꽃 명소 지도 및 날씨 정보",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#FADADD",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  }
}

