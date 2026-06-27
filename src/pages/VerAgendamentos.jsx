import api from "../services/api";
import { useState, useEffect } from "react";

function VerAgendamentos() {

    const [agendamentos, setAgendamentos] = useState([]);

    async function verAgendamentos() {
        try {
            const resposta = await api.get("/agendamentos");
            setAgendamentos(resposta.data);
        } catch (error) {
            console.error("Erro ao buscar agendamentos:", error);
        }
    }

    useEffect(() => {
        verAgendamentos();
    }, []);

    return (
        <div>
            <h1>Agendamentos</h1>

            {agendamentos.length === 0 && (
                <p>Nenhum agendamento encontrado</p>
            )}

            {agendamentos.map((agendamento) => (
                <p key={agendamento.id}>
                    Cliente: {agendamento.cliente?.nome}
                     - Data: {agendamento.data}
                     - Hora: {agendamento.hora}
                     - Serviço: {agendamento.servico}
                </p>
                
            ))}
        </div>
    );
}

export default VerAgendamentos;