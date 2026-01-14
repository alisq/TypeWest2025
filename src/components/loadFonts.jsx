import { useEffect } from "react";
import { sluggify } from "../utils/functions.js";

function LoadFonts({ font, author, fontName, fontStyle }) {
  
  const styleName = fontStyle ?? "reg";

  const woffFileUrl =
    "https://cdn.sanity.io/files/1ml3hcmy/production/" +
    font.asset._ref.split("-")[1] +
    "." +
    font.asset._ref.split("-")[2];

  useEffect(() => {
    const styleId = `font-${sluggify(fontName)}-${sluggify(styleName)}`;

    // avoid duplicates on re-render
    if (document.getElementById(styleId)) return;

    const style = document.createElement("style");
    style.id = styleId;
    style.setAttribute("data-font", fontName);

    const format = woffFileUrl.split(".").pop(); // "woff2" etc.

    style.textContent = `
      @font-face {
        font-family: '${fontName}_${styleName}';
        src: url('${woffFileUrl}') format('${format}');
        font-weight: 400;
        font-style: normal;
      }

      .${sluggify(fontName)}_${sluggify(styleName)} {
        font-family: '${fontName}_${styleName}';
      }
    `;

    document.head.appendChild(style);

    return () => style.remove(); // cleanup on unmount/change
  }, [fontName, styleName, woffFileUrl]);

  return null;
}

export default LoadFonts;
