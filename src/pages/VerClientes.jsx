import api from "../services/api";
import { useState, useEffect } from "react";

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
        <div>
            <h1>Clientes</h1>

            {clientes.length === 0 && (
                <p>Nenhum cliente encontrado</p>
            )}

            {clientes.map((cliente) => (
                <p key={cliente.id}>
                    Nome: {cliente.nome} - Telefone: {cliente.telefone}
                </p>
            ))}
        </div>
    );
}

export default Clientes;