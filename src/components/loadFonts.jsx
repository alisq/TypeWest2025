import { useEffect } from 'react';
import { sluggify } from '../utils/functions.js';

function LoadFonts({font, author, fontName}) {
    
useEffect(() => {
  const style = document.createElement('style');
  style.setAttribute('data-font', fontName); // Helpful for debugging or future cleanup
  style.textContent = `
    @font-face {
      font-family: '${fontName}';
      src: url('${font}') format('${font.split(".")[3]}');
        font-weight: 400;
  font-style: normal;
    }

    .${sluggify(author)} h2{
      font-family: '${fontName}';
    }
  `;

  document.head.appendChild(style);

  
}, []);



  return null; // This component just injects styles
}

export default LoadFonts;