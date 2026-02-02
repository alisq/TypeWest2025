import './css/reset.css';
import './css/main.css';
import { Routes, Route } from "react-router-dom";

import { useEffect, useState } from "react";
import SubmissionList from './components/submissionList.jsx';
import SubmissionFull from './components/submissionFull.jsx';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import LoadFonts from './components/loadFonts.jsx';
import InformationPage from './components/informationPage.jsx';
import {shuffleArray} from './utils/functions.js';

const SANITY_URL =
  `https://1ml3hcmy.api.sanity.io/v2026-01-06/data/query/production?query=*[_type=="submission"]{_id,typefaceName,shortDesc,videoUrl,longDesc,author,authorImage,biography,fonts,processImages[]{caption,alt,image{asset->{url}}},inUseImages[]{caption,alt,image{asset->{url}}}}
`


function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(SANITY_URL)
      .then(res => res.json())
      .then(json => setItems(shuffleArray(json.result)));
  }, []);

  
  return (
    <div className="App">
         
         <Header />

          {items.map(item =>
  item.fonts.map(font => (
    <LoadFonts
      key={`font-${item._id}-${font._key || font.note}`}
      font={font.file}
      author={item.author}
      fontName={item.typefaceName}
      fontStyle={font.note}
    />
  ))
)}

     <div id="container">
        
    <Routes>

      

                <Route path="/" element={<SubmissionList items={items} />} />

      {/* FULL VIEW */}
      <Route
        path="/font/:id"
        element={<SubmissionFull items={items} />}
      />

      <Route
        path="/Information"
        element={<InformationPage />}
      />

    </Routes>
    </div>
        <Footer />
    </div>
  );
}

export default App;
