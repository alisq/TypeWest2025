import { sluggify } from '../utils/functions.js';


function SubmissionTeaser({fonts, typefaceName, shortDesc, longDesc, woffFile, customTesterText, processImages,externalFontWebsite, inUseImages, author, biography, externalLink, foregroundColor, backgroundColor}) {

  console.log(customTesterText)
     
  return (
    <article 
    className={"submission-teaser " + sluggify(author)}
  // style={{
  //   backgroundColor: backgroundColor.hex,
  //   color: foregroundColor.hex,
  // }}
>
  <div 
    className="top-bar" 
    // style={{borderColor: foregroundColor.hex}}
    >
    <div className="text-left">
      <strong>{typefaceName}</strong> by {author}
    </div>

    <div className="text-right">
      {shortDesc}
    </div>
  </div>

      <h4 className="scroll-on-hover">

                <span className={sluggify(typefaceName) + "-" + sluggify(fonts[0].note)}>{customTesterText} </span>
          
        </h4>
    </article>
  );
}

export default SubmissionTeaser;