import React, { useEffect, useMemo, useState } from "react";
import { PortableText } from "@portabletext/react";
import { useParams } from "react-router-dom";
import { sluggify, getImageURL, cropUrl, portableTextToHtml } from "../utils/functions.js";
import parse from "html-react-parser";
import ControlPanel from "./controlPanel.jsx";
import VideoEmbed from "./videoEmbed.jsx";

function SubmissionFull({ items }) {
  const { authorSlug } = useParams();

  // Derive item safely (can be undefined)
  const item = useMemo(
    () => items?.find((i) => sluggify(i?.author || "") === authorSlug),
    [items, authorSlug]
  );
 

  
  // Local UI state (hooks must be top-level)
  const [fontSize, setFontSize] = useState(10);
  const [leading, setLeading] = useState(1);
  const [tracking, setTracking] = useState(0);
  const [activeOrientation, setActiveOrientation] = useState("left");
  const [activeVersion, setActiveVersion] = useState("");

  // Pull fonts safely (empty array if item not ready)
  const fonts = item?.fonts || [];

  // Set document title when item arrives
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!item?.typefaceName) return;
    document.title = `${item.typefaceName} | TypeWest 2025`;
  }, [item?.typefaceName]);


  useEffect(() => {
  if (item?.specimen_text_font_size == null) return;
  setFontSize(item.specimen_text_font_size);
}, [item?.specimen_text_font_size]);

useEffect(() => {
  if (item?.specimen_text_line_height == null) return;
  setLeading(item.specimen_text_line_height);
}, [item?.specimen_text_line_height]);


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
    specimen_text_long_html,
    specimen_text_font_size,
    videoUrl,
    processImages,
    inUseImages
  } = item;


  const showTeaserText = Boolean(fonts?.[0]?.testText);
  const showSpecimenHtml = Boolean(specimen_text_long_html?.code);
  const showAbout = Boolean(longDesc);
  const showBiography = Array.isArray(biography) && biography.length > 0;
  const showProcessImages = Array.isArray(processImages) && processImages.length > 0;
  const showInUseImages = Array.isArray(inUseImages) && inUseImages.length > 0;
  const showVideo = Boolean(videoUrl);

  return (
    <>
      <section className={"submission-full-top " + sluggify(author || "")}>
        <div className="two-up small-one-up">
          <div className="text-left">
            {typefaceName && <strong>{typefaceName}</strong>}
            {typefaceName && author && " by "}
            {author && <span>{author}</span>}
          </div>
          <div className="text-right small-left">{shortDesc && <span>{shortDesc}</span>}</div>
        </div>

        {showSpecimenHtml ? (
          <h2
          contentEditable
          className={`${sluggify(typefaceName)}-${sluggify(selectedFont?.note || "")} specimen-text-long`}
          style={{
            fontSize: `${fontSize}vw`,
            lineHeight: `${leading}`,
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
            lineHeight: `${leading}`,
            letterSpacing: `${tracking / 500}em`,
            textAlign: activeOrientation
          }}
          key={selectedFont?._id}
        >
          {showTeaserText ? fonts[0].testText : ""}
        </h2>
        )}

        {typefaceName && fonts?.length > 0 && (
          <ControlPanel
            fontName={typefaceName}
            versions={fonts.map((f) => f.note).filter(Boolean)}
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
        )}
      </section>

      <section className="submission-full-body">
        <div className="grid-large-four">
          <div className="medium-span-2">
            {showAbout && (
              <>
                <h3>About <em>{typefaceName}</em></h3>
                {parse(portableTextToHtml(longDesc))}
              </>
            )}
          </div>
          <div className="medium-span-2"></div>
          <div>
            {authorImage && (
              <div
                className="author-image"
                style={{ backgroundImage: `url(${getImageURL(authorImage)})` }}
              />
            )}
          </div>
          <div>
            {author && <h3>{author}</h3>}
            {showBiography && parse(portableTextToHtml(biography))}
          </div>
        </div>

        {showProcessImages && (
          <div className="process-images two-up small-one-up padding-1-rem">
            <h3 className="text-center top-pad-2 span-2">Process</h3>
            
            {processImages.map((processImage) => {
              const url = processImage?.image?.asset?.url;
              if (!url) return null;
              return (
                <div className="process-image" key={processImage?._key || processImage?.image?.asset?._ref}>
                  <img src={cropUrl(processImage.image.asset.url, { w: 1600, h: 1200 })} alt={processImage.alt || ""} />
                  {processImage?.caption && <div className="caption">{processImage.caption}</div>}
                </div>
              );
            })}
          </div>
        )}

        

        {showInUseImages && (
          <div className="in-use-images two-up small-one-up">
            <h3 className="text-center top-pad-2 span-2">In Use</h3>
            
            {inUseImages.map((inUseImage) => {
              const url = inUseImage?.image?.asset?.url;
              if (!url) return null;
              return (
                <div className="in-use-image" key={inUseImage?._key || inUseImage?.image?.asset?._ref}>
                  <img src={cropUrl(inUseImage.image.asset.url, { w: 1600, h: 1200 })} alt={inUseImage.alt || ""} />
                  {inUseImage?.caption && <div className="caption">{inUseImage.caption}</div>}
                </div>
              );
            })}
          </div>
        )}


        {showVideo && (
          
          <VideoEmbed videoUrl={videoUrl} />
          
        )}
      </section>
    </>
  );
}

export default SubmissionFull;
