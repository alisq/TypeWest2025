import { useParams } from "react-router-dom";
import { sluggify } from "../utils/functions.js";

function SubmissionFull({ items }) {
  const { id } = useParams();
  const item = items.find((i) => i._id === id);

  // items not loaded yet, or id not found
  if (!item) return <div>Loading…</div>;

  const {
    typefaceName,
    shortDesc,
    longDesc,
    woffFile,
    customTesterText,
    externalFontWebsite,
    author,
    foregroundColor,
    backgroundColor,
  } = item;

  const ref = woffFile?.asset?._ref;
  const woffFileUrl = ref
    ? `https://cdn.sanity.io/files/1ml3hcmy/production/${ref.split("-")[1]}.${ref.split("-")[2]}`
    : null;

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

      <h2>{typefaceName}</h2>

      <p>{longDescText}</p>

      {woffFileUrl ? (
        <p>{woffFileUrl}</p>
      ) : (
        <p>(No woffFile attached)</p>
      )}

      <p>{customTesterText}</p>
      <p>{externalFontWebsite}</p>
    </article>
  );
}

export default SubmissionFull;
