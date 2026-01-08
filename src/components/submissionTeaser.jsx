import { sluggify } from '../utils/functions.js';


function SubmissionTeaser({typefaceName, shortDesc, longDesc, woffFile, customTesterText, processImages,externalFontWebsite, inUseImages, author, biography, externalLink, foregroundColor, backgroundColor}) {

   const woffFileUrl = "https://cdn.sanity.io/files/1ml3hcmy/production/"+woffFile.asset._ref.split("-")[1]+"."+woffFile.asset._ref.split("-")[2]
  
     
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

      <h2>{typefaceName}</h2>
        <p>
        
        
      </p>
      
    </article>
  );
}

export default SubmissionTeaser;