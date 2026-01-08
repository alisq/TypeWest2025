import { Link } from "react-router-dom";
import SubmissionTeaser from "./submissionTeaser.jsx";

function SubmissionList({ items = [] }) {
  return (
    <div className="submission_teaser_list">
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