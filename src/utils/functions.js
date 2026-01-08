export function sluggify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')       // remove non-alphanumeric chars except space
    .trim()
    .replace(/\s+/g, '_')              // replace spaces with underscores
    .replace(/^(\d)/, '_$1');          // prefix underscore if it starts with a digit
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