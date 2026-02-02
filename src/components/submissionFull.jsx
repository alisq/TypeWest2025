import { useParams } from "react-router-dom";
import { sluggify, getImageURL, cropUrl, portableTextToHtml } from "../utils/functions.js";
import parse from 'html-react-parser';
import React, { useEffect, useState } from 'react';
// import LoadFonts from './loadFonts';
import ControlPanel from "./controlPanel.jsx";


function SubmissionFull({ items }) {
  const { id } = useParams();
  const item = items.find((i) => i._id === id);


    const [fontSize, setFontSize] = useState(window.innerWidth < 550 ? 24 : 78);
    const [leading, setLeading] = useState(12)
    const [tracking, setTracking] = useState(0)
    const [activeOrientation, setActiveOrientation] = useState('center')
    


  const divRef = React.useRef(null);

  // const handleClick = () => {
    
  //   const range = document.createRange();
  //   const selection = window.getSelection();

  //   if (divRef.current && selection) {
  //     range.selectNodeContents(divRef.current);
  //     selection.removeAllRanges();
  //     selection.addRange(range);
  //   }
  // };


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

  
console.log(authorImage)


  const bg = backgroundColor?.hex || "#ffffff";
  const fg = foregroundColor?.hex || "#000000";


const style = document.createElement("style");
// style.id = sluggify(author);
// style.setAttribute("data-color", sluggify(author));

style.textContent = `
        .submission_full_top .control_panel .slider { background: ${fg}};
        .submission_full_top .control_panel .slider::-webkit-slider-thumb { background: ${fg}; }
        .submission_full_top .control_panel .slider::-moz-range-thumb {  background: ${fg}; }

        
`;
// document.head.appendChild(style)



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
    
    <section
      className={"submission_full_top " + sluggify(author || "")}
      // style={{ backgroundColor: bg, color: fg }}
    >
      <div 
        // style={{ borderColor: fg }}
        >
        <div className="left">
          <strong>{typefaceName}</strong> by {author}
        </div>
        <div className="right">{shortDesc}</div>
      </div>


  {
  fonts.map((font) => {
  return (
    <>
    
      <h2 contentEditable className={sluggify(typefaceName)+"_"+sluggify(font.note)}
        style={{
          fontSize: `${fontSize}px`, 
          lineHeight: `${leading/10}`, 
          letterSpacing: `${tracking/500}em`,
          textAlign: `${activeOrientation}` 
        }} key={font._id}>{font.testText}</h2>
    </>
  );
})}
      
       <ControlPanel
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
    <section className="submission_full_body" 
    // style={{ color: bg, backgroundColor: fg }}
    >
      <div className="grid_four">

        <div><h3>About</h3>{longDescText}</div>
        <div></div>
        <div>
    {authorImage && (
  <div
    className="authorImage"
    style={{ backgroundImage: `url(${getImageURL(authorImage)})` }}
  />
)}
          </div>
        <div><h3>{author}</h3>{parse(portableTextToHtml(biography))}</div>
      </div>

      {processImages?.length > 0 && (
      <div className="processImages">
        <h3>Process</h3>
        <div></div>

        

        {processImages.map(((processImage)=> (
          <div className="processImage">
              <img src={cropUrl(processImage.image.asset.url, { w: 1600, h: 1200 })} />
              <div className="caption">
                {processImage.caption}
              </div>
          </div>
          
        )
        ))}
      </div>
      )}

      {inUseImages?.length > 0 && (
        <div className="inUseImages">
          <h3>In Use</h3>
          <div></div>
          {inUseImages.map(((inUseImage)=> (
            <div className="inUseImage">
                <img src={cropUrl(inUseImage.image.asset.url, { w: 1600, h: 1200 })} />
                <div className="caption">
                  {inUseImage.caption}
                </div>
            </div>
            
          )
          ))}
          
        </div>
       )}
    </section>
   
    </>
  );
}

export default SubmissionFull;





