import './css/reset.css';
import './css/main.css';
import { Link, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import SubmissionTeaser from './components/submissionTeaser.jsx';
import SubmissionFull from './components/submissionFull.jsx';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import LoadFonts from './components/loadFonts.jsx';

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
        <LoadFonts key={'font'+item._id} font={"https://cdn.sanity.io/files/1ml3hcmy/production/"+item.woffFile.asset._ref.split("-")[1]+"."+item.woffFile.asset._ref.split("-")[2]} author={item.author} fontName={item.typefaceName}/>
      ))}

     
        {/* 👇 STEP THREE GOES HERE */}
    <Routes>

      {/* LIST / INDEX VIEW */}
      <Route
        path="/"
        element={
          items.map(item => (
            <Link
              key={item._id}
              to={`/font/${item._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <SubmissionTeaser {...item} />
            </Link>
          ))
        }
      />

      {/* FULL VIEW */}
      <Route
        path="/font/:id"
        element={<SubmissionFull items={items} />}
      />

    </Routes>
        <Footer />
    </div>
  );
}

export default App;
