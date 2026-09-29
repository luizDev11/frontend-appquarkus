
import api from "../services/api";
import { useState, useEffect } from "react";
import Header from "../components/Header/Header.jsx";
import "./VerClientes.css";

function Clientes() {

    const [clientes, setClientes] = useState([]);

    async function verClientes() {
        try {
            const resposta = await api.get("/clientes");
            setClientes(resposta.data);
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
        }
    }

    useEffect(() => {
        verClientes();
    }, []);

    return (
        <div className="clientes-page">

            <Header />

            <main className="clientes-container">

                <div className="clientes-header">

                    <div>
                        <h1>Clientes</h1>
                        <p>Gerencie os clientes cadastrados no estúdio.</p>
                    </div>

                    <span className="total-clientes">
                        {clientes.length} cliente
                        {clientes.length !== 1 ? "s" : ""}
                    </span>

                </div>

                {clientes.length === 0 ? (
                    <div className="empty-state">
                        <h2>Nenhum cliente encontrado</h2>
                        <p>
                            Quando você cadastrar um cliente, ele aparecerá aqui.
                        </p>
                    </div>
                ) : (
                    <div className="clientes-lista">

                        {clientes.map((cliente) => (
                            <div
                                className="cliente-card"
                                key={cliente.id}
                            >

                                <div className="cliente-icone">
                                    {cliente.nome.charAt(0).toUpperCase()}
                                </div>

                                <div className="cliente-info">
                                    <h2>{cliente.nome}</h2>
                                    <p>{cliente.telefone}</p>
                                </div>

                                <div className="cliente-id">
                                    #{cliente.id}
                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </main>

        </div>
    );
}

export default Clientes;

