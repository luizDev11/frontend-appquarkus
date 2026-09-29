import api from "../services/api";
import {useState, useEffect} from "react";
import Header from "../components/Header/Header.jsx";
import "./VerAgendamentos.css";

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
    return (<div className="agendamentos-page"><Header/>
        <main className="agendamentos-container">
            <div className="agendamentos-header"><h1>Agendamentos</h1> <p>Confira os atendimentos agendados</p></div>
            {agendamentos.length === 0 && (
                <div className="agendamentos-vazio"><p>Nenhum agendamento encontrado</p></div>)}
            <div className="agendamentos-lista"> {agendamentos.map((agendamento) => (
                <div className="agendamento-card" key={agendamento.id}>
                    <div className="agendamento-card-header">
                        <h2> {agendamento.cliente?.nome || "Cliente não informado"} </h2> <span
                        className="agendamento-status"> {agendamento.statusAgendamento} </span></div>
                    <div className="agendamento-info">
                        <div className="info-item"><span>Data</span> <strong>{agendamento.data}</strong></div>
                        <div className="info-item"><span>Horário</span> <strong>{agendamento.hora}</strong></div>
                        <div className="info-item"><span>Serviço</span>
                            <strong> {agendamento.servico?.nome || "Não informado"} </strong></div>
                        <div className="info-item"><span>Valor</span> <strong> R$ {agendamento.valor} </strong></div>
                    </div>
                </div>))} </div>
        </main>
    </div>);
}

export default VerAgendamentos;