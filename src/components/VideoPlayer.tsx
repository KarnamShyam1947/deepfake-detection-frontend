import React from "react";
import { AdvancedVideo } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { useSearchParams } from "react-router-dom";

export default function FullScreenVideo() {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "ddm2qblsr",
    },
  });

  const [params] = useSearchParams();
  const encodedUrl = params.get("url");
  const fullUrl = encodedUrl ? decodeURIComponent(encodedUrl) : null;

  // Extract public ID from full URL
  let videoPublicId: string | null = null;
  if (fullUrl) {
    const match = fullUrl.match(/\/upload\/(?:v\d+\/)?(.+)\.(mp4|mov|webm)$/);
    if (match) {
      videoPublicId = match[1];
    }
  }

  const video = videoPublicId ? cld.video(videoPublicId) : null;

  return (
    <div style={containerStyles}>
      {video ? (
        <AdvancedVideo
          cldVid={video}
          controls
          style={videoStyles}
        />
      ) : (
        <p style={{ color: "#fff" }}>Invalid or missing video URL.</p>
      )}
    </div>
  );
}

// container styles remain the same
const containerStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
  background: "#000",
};

// video styles with correct typing for `objectFit`
const videoStyles: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "contain", // valid CSSObjectFit
};
