import api from "../services/api";
import { useState, useEffect } from "react";
import Header from "../components/Header/Header.jsx";

function Servicos() {

    const [servicos, setServicos] = useState([]);

    async function verServicos() {
        try {
            const resposta = await api.get("/servicos");
            setServicos(resposta.data);
        } catch (error) {
            console.error("Erro ao buscar serviços:", error);
        }
    }

    useEffect(() => {
        verServicos();
    }, []);

    return (
        <div>

            <Header />

            <h1>Servicos</h1>

            {servicos.length === 0 && (
                <p>Nenhum servico encontrado</p>
            )}

            {servicos.map((servicos) => (
                <p key={servicos.id}>
                    Nome: {servicos.nome} - Valor: {servicos.valor}
                </p>
            ))}
        </div>
    );
}

export default Servicos;