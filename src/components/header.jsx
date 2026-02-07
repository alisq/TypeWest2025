import { Link } from "react-router-dom";

function Header() {

    return (
        <header>
            <ul className="nav">
            <Link to="/">
                <li className="light two-up header-item-1">                
                    <h1 className="text-left"><strong>Type West</strong></h1>
                    <div className="text-right">Class of 2025</div>                
                </li>
            </Link>
            <li className="dark  header-item-2">
                <h2>Postgraduate Certificate in Type Design</h2>
            </li>
            <Link to="/Information">
                <li className="light  header-item-3">
                    Information
                </li>
            </Link>
            <Link to="https://typewest.letterformarchive.org/">
            <li className="dark  header-item-4">
                About Type West
            </li>
            </Link>
            </ul>
        </header>
    )
}

export default Header;