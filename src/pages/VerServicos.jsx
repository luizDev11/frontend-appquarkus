import api from "../services/api";
import { useState, useEffect } from "react";
import Header from "../components/Header/Header.jsx";
import "./VerServico.css";
import {Link} from "react-router-dom";

function VerServico() {

    const [servicos, setServicos] = useState([]);

    async function verServicos() {
        try {
            const resposta = await api.get("/servicos");
            setServicos(resposta.data);
        } catch (error) {
            console.error("Erro ao buscar serviços:", error);
        }
    }

    async function inativarServico(id) {
        try {
            await api.delete(`/servicos/${id}`);

            await verServicos();

        } catch (error) {
            console.error("Erro ao inativar serviço:", error);
        }
    }

    async function ativarServico(id) {
        try {
            await api.put(`/servicos/${id}/ativar`);

            await verServicos();

        } catch (error) {
            console.error("Erro ao ativar serviço:", error);
        }
    }

    useEffect(() => {
        verServicos();
    }, []);

    return (
        <div className="servicos-page">

            <Header />

            <main className="servicos-container">

                <div className="servicos-header">
                    <div>
                        <h1>Serviços</h1>
                        <p>
                            Serviços cadastrados no Studio Vivis
                        </p>
                    </div>

                    <span className="total-servicos">
                        {servicos.length} serviço
                        {servicos.length !== 1 ? "s" : ""}
                    </span>
                </div>


                {servicos.length === 0 ? (

                    <div className="sem-servicos">
                        <h2>Nenhum serviço encontrado</h2>
                        <p>
                            Cadastre um serviço para ele aparecer aqui.
                        </p>
                    </div>

                ) : (

                    <div className="servicos-grid">

                        {servicos.map((servico) => (

                            <div
                                className="servico-card"
                                key={servico.id}
                            >

                                <div className="servico-topo">

                                    <div>
                                        <span className="servico-id">
                                            Serviço #{servico.id}
                                        </span>

                                        <h2>
                                            {servico.nome}
                                        </h2>
                                    </div>

                                    <span
                                        className={
                                            servico.statusServico === "ATIVO"
                                                ? "status status-ativo"
                                                : "status status-inativo"
                                        }
                                    >
                                        {servico.statusServico}
                                    </span>

                                </div>


                                <div className="servico-preco">

                                    <span>Valor</span>

                                    <strong>
                                        R$ {Number(servico.valor).toFixed(2).replace(".", ",")}
                                    </strong>

                                </div>


                                <div className="servico-acoes">

                                    <Link
                                        to={`/editarServico/${servico.id}`} className="btn-editar"
                                    >
                                        Editar
                                    </Link>

                                    {servico.statusServico === "ATIVO" ? (

                                        <button
                                           className="btn-inativar"
                                            onClick={() => inativarServico(servico.id)}>
                                            Inativar
                                        </button>

                                    ) : (


                                        <button
                                            className="btn-ativar"
                                            onClick={() => ativarServico(servico.id)}>
                                            Ativar
                                        </button>

                                    )}

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </main>

        </div>
    );
}

export default VerServico;