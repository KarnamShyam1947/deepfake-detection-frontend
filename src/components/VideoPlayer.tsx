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
  console.log("Full URL:", fullUrl);

  // Extract public ID from full URL
  let videoPublicId = null;
  if (fullUrl) {
    const match = fullUrl.match(/\/upload\/(?:v\d+\/)?(.+)\.(mp4|mov|webm)$/);
    if (match) {
      videoPublicId = match[1]; // deepfake-outputs/m92baz7wyf1bbk0l2gp7
    }
  }
  console.log("Video Public ID:", videoPublicId);

  const video = videoPublicId ? cld.video(videoPublicId) : null;

  return (
    <div style={styles.container}>
      {video ? (
        <AdvancedVideo cldVid={video} controls style={styles.video} />
      ) : (
        <p style={{ color: "#fff" }}>Invalid or missing video URL.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    background: "#000",
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
};
