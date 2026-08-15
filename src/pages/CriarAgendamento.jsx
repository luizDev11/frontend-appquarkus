import { useState } from "react";
import api from "../services/api";
import Header from "../components/Header";

function CriarAgendamento() {

    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");

    const [clienteLogado, setClienteLogado] = useState(null);

    const [data, setData] = useState("");
    const [hora, setHora] = useState("");
    const [servico, setServico] = useState("");
    const [mensagem, setMensagem] = useState("");

    async function verificarCliente(e) {
        e.preventDefault();

        try {
            const resposta = await api.get(`/agendamentos/buscarPorTelefone?telefone=${telefone}`);

            const clienteEncontrado = resposta.data;
            if (clienteEncontrado) {
                setClienteLogado(clienteEncontrado);
                setMensagem("Cliente encontrado! Você pode criar o agendamento.");
            } else {
                setMensagem("Cliente não encontrado. Por favor, cadastre um cliente antes de criar um agendamento.");
            }
        } catch (error) {
            console.error("Erro ao verificar cliente:", error);
            setMensagem("Erro ao verificar cliente");
        }
    }


    async function criarAgendamento(e) {
        e.preventDefault();

        const agendamento = {
            telefone: clienteLogado.telefone,
            data: data,
            hora: hora,
            servico: servico
        };

        try {
            await api.post("/agendamentos", agendamento);

            console.log("Agendamento criado");

            setMensagem("Agendamento criado com sucesso!");

            setData("");
            setHora("");
            setServico("");

            setTimeout(() => {
                setMensagem("");
            }, 3000);

        } catch (error) {
            console.error("Erro ao criar agendamento:", error);
            setMensagem("Erro ao criar agendamento");
        }
    }

    return (
        <div>

            <Header />

            <h1>Criar Agendamento</h1>

            {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}

            {!clienteLogado && (
                <form onSubmit={verificarCliente}>
                    <input

                        placeholder="Telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                    <input

                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

                    <button type="submit">Entrar</button>
                </form>
            )}
            {clienteLogado && (
                <form onSubmit={criarAgendamento}>

                    <h3>Olá, {clienteLogado.nome}</h3>

                    <input
                        type="date"
                        placeholder="Data"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                    />
                    <input
                        type="time"
                        placeholder="Hora"
                        value={hora}
                        onChange={(e) => setHora(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Serviço"
                        value={servico}
                        onChange={(e) => setServico(e.target.value)}
                    />
                    <button type="submit">
                        Criar Agendamento
                    </button>
                </form>
            )}
        </div>
    );
}

export default CriarAgendamento;