import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/Logo.png';
import './Menu.css';
import Button from '../Button';
//import ButtonLink from './components/ButtonLink';

function Menu() {
    return (
        <nav className="Menu">
            <Link to="/">
                <img className="Logo" src={Logo} alt="VejoFlix logo" />
            </Link>
            <div>
                <Button as={Link} className="ButtonLink" to="/delete/Video">
                    Deletar um Vídeo
                </Button>
                <Button as={Link} className="ButtonLink" to="/cadastro/video">
                    Novo Vídeo
                </Button>
            </div>
        </nav>
    );
}

export default Menu;