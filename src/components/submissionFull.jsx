import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { sluggify, getImageURL, cropUrl, portableTextToHtml } from "../utils/functions.js";
import parse from "html-react-parser";
import ControlPanel from "./controlPanel.jsx";
import VideoEmbed from "./videoEmbed.jsx";

function SubmissionFull({ items }) {
  const { id } = useParams();

  // Derive item safely (can be undefined)
  const item = useMemo(() => items?.find((i) => i._id === id), [items, id]);
 

  
  // Local UI state (hooks must be top-level)
  const [fontSize, setFontSize] = useState((window.innerWidth < 550 ? 10 : 10));
  const [leading, setLeading] = useState(10);
  const [tracking, setTracking] = useState(0);
  const [activeOrientation, setActiveOrientation] = useState("left");
  const [activeVersion, setActiveVersion] = useState("");

  // Pull fonts safely (empty array if item not ready)
  const fonts = item?.fonts || [];

  // Set document title when item arrives
  useEffect(() => {
    if (!item?.typefaceName) return;
    document.title = `${item.typefaceName} | TypeWest 2025 Online Cohort`;
  }, [item?.typefaceName]);


  useEffect(() => {
  if (item?.specimen_text_font_size == null) return;
  setFontSize(item.specimen_text_font_size);
}, [item?.specimen_text_font_size]);


  // Initialize version when fonts arrive / change
  useEffect(() => {
    if (!fonts.length) return;
    // keep current selection if it still exists, otherwise default to first
    setActiveVersion((prev) => (fonts.some(f => f.note === prev) ? prev : fonts[0].note));
  }, [fonts]);

  // Choose selected font
  const selectedFont =
    fonts.find((f) => f.note === activeVersion) || fonts[0];

  // ✅ Now it’s safe to return conditionally (after hooks)
  if (!item) return <div>Loading…</div>;

  const {
    typefaceName,
    shortDesc,
    longDesc,
    customTesterText,
    externalFontWebsite,
    author,
    authorImage,
    biography,
    foregroundColor,
    backgroundColor,
    specimen_text_long,
    specimen_text_long_html,
    specimen_text_font_size,
    videoUrl,
    processImages,
    inUseImages
  } = item;

  
  
  
  const longDescText =
    Array.isArray(longDesc)
      ? longDesc.flatMap((block) => block?.children || []).map((c) => c?.text || "").join("")
      : "";

  return (
    <>
      <section className={"submission-full-top " + sluggify(author || "")}>
        <div className="two-up">
          <div className="text-left">
            <strong>{typefaceName}</strong> by {author}
          </div>
          <div className="text-right">{shortDesc}</div>
        </div>

        {(specimen_text_long_html != undefined) ? (
          <h2
          contentEditable
          className={`${sluggify(typefaceName)}-${sluggify(selectedFont?.note || "")} specimen-text-long`}
          style={{
            fontSize: `${fontSize}vw`,
            lineHeight: `${leading / 10}`,
            letterSpacing: `${tracking / 500}em`,
            textAlign: activeOrientation
          }}
          key={selectedFont?._id}
        >
          {parse(specimen_text_long_html.code)}
        </h2>
        ) : (
<h2
          contentEditable
          className={`${sluggify(typefaceName)}-${sluggify(selectedFont?.note || "")}`}
          style={{
            fontSize: `${fontSize}vw`,
            lineHeight: `${leading / 10}`,
            letterSpacing: `${tracking / 500}em`,
            textAlign: activeOrientation
          }}
          key={selectedFont?._id}
        >
          {fonts[0].testText}
        </h2>
        )}

        <ControlPanel
          fontName={typefaceName}
          versions={fonts.map((f) => f.note)}
          activeVersion={activeVersion}
          setActiveVersion={setActiveVersion}
          fontSize={fontSize}
          setFontSize={setFontSize}
          leading={leading}
          setLeading={setLeading}
          tracking={tracking}
          setTracking={setTracking}
          activeOrientation={activeOrientation}
          setActiveOrientation={setActiveOrientation}
        />
      </section>

      <section className="submission-full-body">
        <div className="grid-large-four">
          <div className="medium-span-2"><h3>About</h3>{longDescText}</div>
          <div className="medium-span-2"></div>
          <div>
            {authorImage && (
              <div
                className="author-image"
                style={{ backgroundImage: `url(${getImageURL(authorImage)})` }}
              />
            )}
          </div>
          <div><h3>{author}</h3>{parse(portableTextToHtml(biography))}</div>
        </div>

        {processImages?.length > 0 && (
          <div className="process-images grid-large-two">
            <h3>Process</h3>
            <div></div>
            {processImages.map((processImage) => (
              <div className="process-image" key={processImage?._key || processImage?.image?.asset?._ref}>
                <img src={cropUrl(processImage.image.asset.url, { w: 1600, h: 1200 })} alt={processImage.alt || ""} />
                <div className="caption">{processImage.caption}</div>
              </div>
            ))}
          </div>
        )}

        

        {inUseImages?.length > 0 && (
          <div className="in-use-images grid-large-two">
            <h3>In Use</h3>
            <div></div>
            {inUseImages.map((inUseImage) => (
              <div className="in-use-image" key={inUseImage?._key || inUseImage?.image?.asset?._ref}>
                <img src={cropUrl(inUseImage.image.asset.url, { w: 1600, h: 1200 })} alt={inUseImage.alt || ""} />
                <div className="caption">{inUseImage.caption}</div>
              </div>
            ))}
          </div>
        )}


        {videoUrl !== undefined && (
          
          <VideoEmbed videoUrl={videoUrl} />
          
        )}
      </section>
    </>
  );
}

export default SubmissionFull;
