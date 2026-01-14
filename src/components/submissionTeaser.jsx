import { sluggify } from '../utils/functions.js';


function SubmissionTeaser({fonts, typefaceName, shortDesc, longDesc, woffFile, customTesterText, processImages,externalFontWebsite, inUseImages, author, biography, externalLink, foregroundColor, backgroundColor}) {

  
     
  return (
    <article 
    className={"submission_teaser "+sluggify(author)}
  style={{
    backgroundColor: backgroundColor.hex,
    color: foregroundColor.hex,
  }}
>
  <div className="top_bar" style={{borderColor: foregroundColor.hex}}>
    <div className="left">
      <strong>{typefaceName}</strong> by {author}
    </div>

    <div className="right">
      {shortDesc}
    </div>
  </div>

      <h4 className="scroll-on-hover">
          <span className={sluggify(typefaceName)+"_"+sluggify(fonts[0].note)}>{fonts[0].testText} </span>
          <span className={sluggify(typefaceName)+"_"+sluggify(fonts[1].note)}>{fonts[1].testText} </span>
          <span className={sluggify(typefaceName)+"_"+sluggify(fonts[2].note)}>{fonts[2].testText}</span>
        </h4>
        <p>
        
        
      </p>
      
    </article>
  );
}

export default SubmissionTeaser;