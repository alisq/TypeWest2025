import { sluggify } from '../utils/functions.js';


function SubmissionTeaser({fonts, typefaceName, shortDesc, longDesc, woffFile, customTesterText, processImages,externalFontWebsite, inUseImages, author, biography, externalLink, foregroundColor, backgroundColor}) {

  
     
  return (
    <article 
    className={"submission_teaser "+sluggify(author)}
  // style={{
  //   backgroundColor: backgroundColor.hex,
  //   color: foregroundColor.hex,
  // }}
>
  <div 
    className="top_bar" 
    // style={{borderColor: foregroundColor.hex}}
    >
    <div className="left">
      <strong>{typefaceName}</strong> by {author}
    </div>

    <div className="right">
      {shortDesc}
    </div>
  </div>

      <h4 className="scroll-on-hover">

          {
            fonts.map(font =>{
              return (
                <span key={font._key} className={sluggify(typefaceName)+"_"+sluggify(font.note)}>{font.testText} </span>
              )
            })
          }

          
        </h4>
    </article>
  );
}

export default SubmissionTeaser;