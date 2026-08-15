import {Link} from 'react-router-dom';
import Header from "../components/Header";

function Home (){

    return (
        
        <div>

            <Header />

            <h1>Estudios de cílios</h1>

            <Link to="/clientes/cadastrar">
                <button>Cadastrar Clientes</button>
            </Link>

            <br />
            <br />

            <Link to="/clientes/ver">
                <button>Ver Clientes</button>
            </Link>

            <br />
            <br />

            <Link to="/agendamento/criar">
                <button>Criar Agendamento</button>
            </Link>

              <br />
            <br />

            <Link to="/agendamento/ver">
                <button>Ver Agendamentos</button>
            </Link>

        </div>
    );
}

export default Home;