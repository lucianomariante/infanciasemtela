import { ImageResponse } from "next/og";

export const alt = "Infância Sem Tela — brincar com presença";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#faf7f0",
          color: "#1c1917",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "64px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#fde2d1",
            borderRadius: "999px",
            height: "240px",
            left: "-60px",
            position: "absolute",
            top: "-80px",
            width: "240px",
          }}
        />
        <div
          style={{
            background: "#dbeafe",
            borderRadius: "999px",
            bottom: "-120px",
            height: "320px",
            position: "absolute",
            right: "-80px",
            width: "320px",
          }}
        />
        <div
          style={{
            alignItems: "flex-start",
            background: "rgba(255,255,255,0.9)",
            border: "2px solid #e7dccb",
            borderRadius: "48px",
            display: "flex",
            flexDirection: "column",
            padding: "64px 72px",
            width: "100%",
          }}
        >
          <div
            style={{
              color: "#0f766e",
              display: "flex",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Brincar com presença
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: -4,
              lineHeight: 1.05,
              marginTop: 28,
            }}
          >
            Infância Sem Tela
          </div>
          <div
            style={{
              color: "#57534e",
              display: "flex",
              fontSize: 30,
              lineHeight: 1.35,
              marginTop: 24,
            }}
          >
            Guias práticos para escolher brinquedos e ideias sem tela.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
