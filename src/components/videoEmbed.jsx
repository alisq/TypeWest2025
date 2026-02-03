import React from "react";

function VideoEmbed({ videoUrl, title = "Embedded video", aspect = "16 / 9" }) {
  if (!videoUrl || typeof videoUrl !== "string") return null;

  const url = videoUrl.trim();
  if (!url) return null;

  const parsed = parseVideoUrl(url);
  if (!parsed) return null;

  const { provider, id } = parsed;

  const src =
    provider === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${id}`
      : `https://player.vimeo.com/video/${id}`;

  return (
    <div
      className="video-embed"
      style={{
        width: "100%",
        aspectRatio: aspect, // modern responsive approach
        position: "relative",
      }}
    >
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        style={{
          border: 0,
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
        }}
      />
    </div>
  );
}

export default VideoEmbed;

/** Returns { provider: "youtube"|"vimeo", id: string } or null */
function parseVideoUrl(input) {
  // Ensure we can use URL() by adding protocol if missing
  const safe = input.startsWith("http://") || input.startsWith("https://")
    ? input
    : `https://${input}`;

  let u;
  try {
    u = new URL(safe);
  } catch {
    return null;
  }

  const host = u.hostname.replace(/^www\./, "").toLowerCase();
  const path = u.pathname || "";

  // --- YouTube ---
  // supports:
  // - youtube.com/watch?v=VIDEOID
  // - youtu.be/VIDEOID
  // - youtube.com/embed/VIDEOID
  // - youtube.com/shorts/VIDEOID
  if (host === "youtu.be") {
    const id = path.split("/").filter(Boolean)[0];
    return id ? { provider: "youtube", id } : null;
  }

  if (host.includes("youtube.com")) {
    const v = u.searchParams.get("v");
    if (v) return { provider: "youtube", id: v };

    const parts = path.split("/").filter(Boolean);
    const embedIndex = parts.indexOf("embed");
    const shortsIndex = parts.indexOf("shorts");

    if (embedIndex !== -1 && parts[embedIndex + 1]) {
      return { provider: "youtube", id: parts[embedIndex + 1] };
    }
    if (shortsIndex !== -1 && parts[shortsIndex + 1]) {
      return { provider: "youtube", id: parts[shortsIndex + 1] };
    }
  }

  // --- Vimeo ---
  // supports:
  // - vimeo.com/123456789
  // - player.vimeo.com/video/123456789
  // - vimeo.com/channels/staffpicks/123456789
  if (host.includes("vimeo.com")) {
    const parts = path.split("/").filter(Boolean);

    // player.vimeo.com/video/ID
    const videoIndex = parts.indexOf("video");
    if (videoIndex !== -1 && parts[videoIndex + 1]) {
      const id = parts[videoIndex + 1];
      return /^\d+$/.test(id) ? { provider: "vimeo", id } : null;
    }

    // last numeric segment in path
    const last = [...parts].reverse().find((p) => /^\d+$/.test(p));
    return last ? { provider: "vimeo", id: last } : null;
  }

  return null;
}
