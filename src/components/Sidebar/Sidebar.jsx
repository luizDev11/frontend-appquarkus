import "./Sidebar.css";

function Sidebar() {
    return (
        <aside className="sidebar">

            <div className="sidebar-logo">
                <h2>Studio</h2>
                <span>de Cílios</span>
            </div>

            <nav className="sidebar-menu">

                <a href="/">
                    🏠
                    <span>Início</span>
                </a>

                <a href="/agendamento">
                    📅
                    <span>Agendamentos</span>
                </a>

                <a href="/clientes">
                    👥
                    <span>Clientes</span>
                </a>

            </nav>

        </aside>
    );
}

export default Sidebar;