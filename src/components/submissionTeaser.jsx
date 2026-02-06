import { sluggify } from "../utils/functions.js";


function SubmissionTeaser({
  fonts,
  typefaceName,
  shortDesc,
  longDesc,
  woffFile,
  customTesterText,
  processImages,
  externalFontWebsite,
  inUseImages,
  author,
  biography,
  externalLink,
  foregroundColor,
  backgroundColor,
}) {
  const hasFontClass = Boolean(typefaceName && fonts?.[0]?.note);
  const teaserText = customTesterText || fonts?.[0]?.testText;

  return (
    <article 
    className={"submission-teaser " + sluggify(author || "")}
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
      {typefaceName && <strong>{typefaceName}</strong>}
      {typefaceName && author && " by "}
      {author && <span>{author}</span>}
    </div>

    <div className="text-right small-left">
      {shortDesc && <span>{shortDesc}</span>}
    </div>
  </div>

      <h4 className="scroll-on-hover">

        {hasFontClass && teaserText && (
          <span className={sluggify(typefaceName) + "-" + sluggify(fonts[0].note)}>
            {teaserText} &nbsp;
          </span>
        )}
          
        </h4>
    </article>
  );
}

export default SubmissionTeaser;