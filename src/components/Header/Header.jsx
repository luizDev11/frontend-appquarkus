import styles from './Header.module.css';
import { Link } from 'react-router-dom';  // 👈 Importe o Link

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link to="/">MeuSite</Link>  {/* 👈 Link ao invés de <a> */}
                </div>
                <nav className={styles.nav}>
                    <ul>
                        <li><Link to="/">Início</Link></li>
                        <li><Link to="/Sobre">Sobre</Link></li>
                        <li><Link to="/servicos">Serviços</Link></li>
                        <li><Link to="/contato">Contato</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;