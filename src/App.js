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

const SANITY_URL =
  "https://1ml3hcmy.api.sanity.io/v2026-01-06/data/query/production?query=*[_type==%22submission%22]";


function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(SANITY_URL)
      .then(res => res.json())
      .then(json => setItems(json.result));
  }, []);

  
  return (
    <div className="App">
         
         <Header />

            {items.map(item=>(
        <LoadFonts key={'font'+item._id} font={item.fonts[0].file} author={item.author} fontName={item.typefaceName} fontStyle={item.fonts[0].note}/>
      ))}

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
