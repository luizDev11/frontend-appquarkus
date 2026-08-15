import { useState } from "react";
import api from "../services/api";
import Header from "../components/Header";

function CadastrarCliente() {

    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [mensagem, setMensagem] = useState("");

    async function cadastrarCliente(e) {
        e.preventDefault();

        const cliente = {
            nome,
            telefone
        };

        try {
            await api.post("/clientes", cliente);

            console.log("Cliente cadastrado");

            setMensagem("Cliente cadastrado com sucesso!");

            setNome("");
            setTelefone("");

            setTimeout(() => {
                setMensagem("");
            }, 3000);

        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
            setMensagem("Erro ao cadastrar cliente");
        }
    }

    return (
        <div>
            <Header />

            <h1>Cadastrar Cliente</h1>

            {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}

            <form onSubmit={cadastrarCliente}>

                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                    Salvar
                </button>

            </form>
        </div>
    );
}

export default CadastrarCliente;