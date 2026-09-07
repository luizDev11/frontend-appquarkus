import {Link} from 'react-router-dom';
import Layout from "../Layout/Layout.jsx";
import './Home.modules.css';
import MiniCalendario from "../components/Calendario/MiniCalendario.jsx";
import { useEffect, useState } from 'react';

function Home() {

    const [totalClientes, setTotalClientes] = useState(null);

    useEffect(() => {

        async function buscarTotalClientes() {

            try {

                const response = await fetch(
                    "http://localhost:8080/clientes/count"
                );

                if (!response.ok) {
                    throw new Error("Erro ao buscar clientes");
                }

                const total = await response.json();

                setTotalClientes(total);

            } catch (error) {

                console.error("Erro:", error);

                setTotalClientes("?");

            }
        }

        buscarTotalClientes();

    }, []);


    return (

        <Layout>
            <div>
                <div className="cards-grid">

                    <div className="small-card">
                        <Link to="/clientes/ver">
                            <button>
                                <span>Total Clientes</span>
                                <strong>
                                    {totalClientes === null
                                        ? "..."
                                        : totalClientes}
                                </strong>
                            </button>
                        </Link>
                    </div>


                    <div className="small-card">

                        <button>Taxa retenção</button>
                    </div>


                    <div className="small-card">

                        <button>Novos este mês</button>
                    </div>


                    <div className="small-card">
                        <button>Agendamentos hoje</button>
                    </div>
                </div>

                <br/>

                <div className="cards-grid">

                    <div className="bigger-card">
                        <MiniCalendario/>
                    </div>

                    <div className="bigger-card">
                        <div className="parte-cima">
                            <Link to="/clientes/ver">
                                <button>Visão geral dos clientes</button>
                            </Link>

                        </div>
                        <div className="parte-baixo">
                            <div className="parte-baixo-esquerda">
                                <Link to="/clientes/cadastrar">
                                    <button>Cadastrar novos (clientes/serviços)</button>
                                </Link>
                            </div>
                            <div className="parte-baixo-direita">
                                <Link to="/agendamento/ver">
                                    <button>Agendamentos</button>
                                </Link>
                            </div>
                        </div>

                    </div>

                </div>


                <div className="home-container">
                    <div className="cards-grid">
                        <div className="single-card">
                            <Link to="/clientes/cadastrar">
                                <button>Cadastrar Clientes</button>
                            </Link>
                        </div>

                        <br/>
                        <br/>
                        <div className="single-card">
                            <Link to="/clientes/ver">
                                <button>Ver Clientes</button>
                            </Link>
                        </div>

                        <br/>
                        <br/>
                        <div className="single-card">
                            <Link to="/agendamento/criar">
                                <button>Criar Agendamento</button>
                            </Link>
                        </div>

                        <br/>
                        <br/>
                        <div className="single-card">
                            <Link to="/agendamento/ver">
                                <button>Ver Agendamentos</button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    )
        ;
}

export default Home;