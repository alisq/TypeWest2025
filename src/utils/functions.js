export function sluggify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")      // remove non-alphanumeric chars except space/hyphen
    .trim()
    .replace(/\s+/g, "-")              // replace spaces with hyphens
    .replace(/^(\d)/, "x-$1");         // prefix to avoid leading digit
}


export function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}
export function getImageURL(ref) {

  
  return "https://cdn.sanity.io/images/1ml3hcmy/production/"+ref.asset._ref.split("-")[1]+"-"+ref.asset._ref.split("-")[2]+"."+ref.asset._ref.split("-")[3];

}
export function portableTextToHtml(blocks = []) {
  if (!Array.isArray(blocks)) return "";

  const escapeHtml = (s = "") =>
    String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const MARK_ORDER = ["strong", "em", "underline", "code"]; // stable nesting order

  const wrapDecorator = (html, mark) => {
    switch (mark) {
      case "strong":
        return `<strong>${html}</strong>`;
      case "em":
        return `<em>${html}</em>`;
      case "underline":
        return `<u>${html}</u>`;
      case "code":
        return `<code>${html}</code>`;
      default:
        return html;
    }
  };

  const wrapMarkDef = (html, def) => {
    if (!def) return html;

    if (def._type === "link" && def.href) {
      const href = escapeHtml(def.href);
      // add rel for safety; target optional
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">${html}</a>`;
    }

    return html;
  };

  const renderSpans = (children = [], markDefs = []) => {
    const defMap = new Map((markDefs || []).map((d) => [d._key, d]));

    return (children || [])
      .filter((n) => n && n._type === "span")
      .map((span) => {
        let html = escapeHtml(span.text || "");

        const marks = Array.isArray(span.marks) ? span.marks : [];
        const decorators = marks
          .filter((m) => MARK_ORDER.includes(m))
          .sort((a, b) => MARK_ORDER.indexOf(a) - MARK_ORDER.indexOf(b));

        const defMarks = marks.filter((m) => !MARK_ORDER.includes(m)); // likely keys into markDefs

        // Apply decorator marks first (strong/em/etc.)
        for (const m of decorators) html = wrapDecorator(html, m);

        // Then apply markDefs (e.g. links) by wrapping
        for (const key of defMarks) {
          const def = defMap.get(key);
          html = wrapMarkDef(html, def);
        }

        return html;
      })
      .join("");
  };

  const renderBlock = (block) => {
    const style = block.style || "normal";
    const inner = renderSpans(block.children, block.markDefs);

    // skip empty blocks (including ones that are just "")
    if (!inner || inner.trim() === "") return "";

    // basic style handling
    if (style === "h1") return `<h1>${inner}</h1>`;
    if (style === "h2") return `<h2>${inner}</h2>`;
    if (style === "h3") return `<h3>${inner}</h3>`;
    if (style === "blockquote") return `<blockquote>${inner}</blockquote>`;

    // default paragraph
    return `<p>${inner}</p>`;
  };

  return blocks
    .filter((b) => b && b._type === "block")
    .map(renderBlock)
    .filter(Boolean)
    .join("\n");
}


export function cropUrl(url, { w = 1200, h = 900, fit = "crop" } = {}) {
  if (!url) return "";
  const u = new URL(url);
  u.searchParams.set("w", w);
  u.searchParams.set("h", h);
  u.searchParams.set("fit", fit);
  u.searchParams.set("auto", "format");
  return u.toString();
}

export function shuffleArray(array) {
  const arr = [...array]; // don’t mutate original
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
