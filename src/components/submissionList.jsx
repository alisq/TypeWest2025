import { Link } from "react-router-dom";
import SubmissionTeaser from "./submissionTeaser.jsx";
import { useEffect } from "react";

function SubmissionList({ items = [] }) {


  // Set document title when item arrives
    useEffect(() => {
    
      document.title = `TypeWest 2025`;
      window.scrollTo(0, 0);
    });
  


  return (
    <div className="submission-teaser-list">
      {items.map((item) => (
        <Link
          key={item._id}
          to={`/font/${item._id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <SubmissionTeaser {...item} />
        </Link>
      ))}
    </div>
  );
}

export default SubmissionList;