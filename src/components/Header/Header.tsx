import { Link, NavLink } from "react-router-dom"

import './header.css';

const Header = () => {
    return (
        <header className="header">
            <nav>
                <NavLink className="link" to='/'>Главная</NavLink>
                <NavLink className="link" to="game">Игра</NavLink>
            </nav>
            <div className="logo">
                <span className="logoText">2048</span>
            </div>
        </header>
    )
}

export default Header;