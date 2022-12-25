import { Link } from "react-router-dom"

import './header.css';

const Header = () => {
    return (
        <header className="header">
            <nav>
            <Link className="link" to='/'>Home</Link>
            <Link className="link" to="game">Game</Link>
            </nav>
            <span className="logo">2048</span>
        </header>
    )
}

export default Header;