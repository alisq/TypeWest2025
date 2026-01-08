import { useParams } from "react-router-dom";
import { sluggify, getImageURL, portableTextToHtml } from "../utils/functions.js";
import parse from 'html-react-parser';
import React, { useEffect, useState } from 'react';
import LoadFonts from './loadFonts';
import ControlPanel from "./controlPanel.jsx";

function SubmissionFull({ items }) {
  const { id } = useParams();
  const item = items.find((i) => i._id === id);


 const [fontSize, setFontSize] = useState(window.innerWidth < 550 ? 24 : 78);
    const [leading, setLeading] = useState(12)
    const [activeOrientation, setActiveOrientation] = useState('center')

  const divRef = React.useRef(null);

  const handleClick = () => {
    
    const range = document.createRange();
    const selection = window.getSelection();

    if (divRef.current && selection) {
      range.selectNodeContents(divRef.current);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };


  useEffect(()=> {
    if (!item?.typefaceName) return;
    document.title = item.typefaceName+" | TypeWest 2025 Online Cohort";
  })


  

  // items not loaded yet, or id not found
  if (!item) return <div>Loading…</div>;

  

  const {
    typefaceName,
    shortDesc,
    longDesc,
    fonts,
    customTesterText,
    externalFontWebsite,
    author,
    authorImage,
    biography,
    foregroundColor,
    backgroundColor,
    processImages,
    inUseImages
  } = item;

  



  const bg = backgroundColor?.hex || "#ffffff";
  const fg = foregroundColor?.hex || "#000000";

  // longDesc is Portable Text; this is a safer “quick display” than longDesc[0].children[0].text
  const longDescText =
    Array.isArray(longDesc)
      ? longDesc
          .flatMap((block) => block?.children || [])
          .map((child) => child?.text || "")
          .join("")
      : "";

  return (
    <>
    
    <article
      className={"submission_teaser " + sluggify(author || "")}
      style={{ backgroundColor: bg, color: fg }}
    >
      <div className="top_bar" style={{ borderColor: fg }}>
        <div className="left">
          <strong>{typefaceName}</strong> by {author}
        </div>
        <div className="right">{shortDesc}</div>
      </div>


  {
  fonts.map((font) => {
  
      <LoadFonts font={font.file} author={sluggify(author)} fontName={typefaceName} fontStyle={font.note}/>



  return <h2 className={sluggify(typefaceName)+"_"+sluggify(font.note)}

  style={{
      fontSize: `${fontSize}px`, 
      lineHeight: `${leading/10}`, 
      textAlign: `${activeOrientation}` 
    }} key={font._id}>{font.testText}</h2>;
})}
      
       <ControlPanel
                fontSize={fontSize}
                setFontSize={setFontSize}
                leading={leading}
                setLeading={setLeading}
                activeOrientation={activeOrientation}
                setActiveOrientation={setActiveOrientation}
                />

   

   

    </article>
    <section className="submission_body" style={{ color: bg, backgroundColor: fg }}>
      <div className="grid_four">

        <div><h3>About</h3>{longDescText}</div>
        <div></div>
        <div>
          <div
              className="authorImage"
              style={{ backgroundImage: `url(${getImageURL(authorImage)})` }}
            />
          </div>
        <div><h3>{author}</h3>{parse(portableTextToHtml(biography))}</div>
      </div>
      <div className="processImages">
        <h3>Process</h3>
        <div></div>
        {processImages.map(((processImage)=> (
          <div className="processImage">
              <img src={getImageURL(processImage.image)} />
              <div className="caption">
                {processImage.caption}
              </div>
          </div>
          
        )
        ))}
      </div>
      <div className="inUseImages">
        <h3>In Use</h3>
        <div></div>
        {inUseImages.map(((inUseImage)=> (
          <div className="inUseImage">
              <img src={getImageURL(inUseImage.image)} />
              <div className="caption">
                {inUseImage.caption}
              </div>
          </div>
          
        )
        ))}
      </div>
    </section>
   
    </>
  );
}

export default SubmissionFull;





