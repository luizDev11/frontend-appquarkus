import { useState } from "react";
import api from "../services/api";
import Header from "../components/Header/Header.jsx";

function CadastrarServico() {

    const [nome, setNome] = useState("");
    const [valor, setValor] = useState("");
    const [mensagem, setMensagem] = useState("");

    async function cadastrarServico(e) {
        e.preventDefault();

        const servico = {
            nome,
            valor
        };

        try {
            await api.post("/servicos", servico);

            console.log("Serviço cadastrado");

            setMensagem("Serviço cadastrado com sucesso!");

            setNome("");
            setValor("");

            setTimeout(() => {
                setMensagem("");
            }, 3000);

        } catch (error) {
            console.error("Erro ao cadastrar serviço:", error);
            setMensagem("Erro ao cadastrar serviço");
        }
    }

    return (
        <div>
            <Header />

            <h1>Cadastrar Serviço</h1>

            {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}

            <form onSubmit={cadastrarServico}>

                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Valor"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                    Salvar
                </button>

            </form>
        </div>
    );
}

export default CadastrarServico;