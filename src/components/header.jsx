import { Link } from "react-router-dom";

function Header() {

    return (
        <header>
            <ul className="nav">
            <Link to="/">
                <li className="light two_up">                
                    <h1 className="left"><strong>Type West</strong></h1>
                    <div className="right">Class of 2025</div>                
                </li>
            </Link>
            <li className="dark">
                <h2>Postgraduate Certificate in Type Design</h2>
            </li>
            <Link to="/Information">
                <li className="light">
                    Information
                </li>
            </Link>
            <li className="dark">
                About Type West
            </li>
            </ul>
        </header>
    )
}

export default Header;