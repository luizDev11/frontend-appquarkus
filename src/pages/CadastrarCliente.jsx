import { useState } from "react";
import api from "../services/api";
import Header from "../components/Header/Header.jsx";
import "./CadastrarCliente.css";

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
        <div className= "cadastro-page">

            <Header />

            <main className="cadastro-container">

                <div className="cadastro-card">

                    <h1>Cadastrar Cliente</h1>

                    <p className="cadastro-subtitulo">
                        Adicione um novo cliente ao seu estúdio
                    </p>

                    {mensagem && (
                        <p className="mensagem-sucesso">
                            {mensagem}
                        </p>
                    )}

                    <form onSubmit={cadastrarCliente} className="cadastro-form">

                        <div className="campo">

                            <label htmlFor="nome">
                                Nome
                            </label>

                            <input
                                id="nome"
                                type="text"
                                placeholder="Digite o nome do cliente"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />

                        </div>

                        <div className="campo">

                            <label htmlFor="telefone">
                                Telefone
                            </label>

                            <input
                                id="telefone"
                                type="text"
                                placeholder="Digite o telefone"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                            />

                        </div>

                        <button type="submit" className="botao-salvar">
                            Salvar cliente
                        </button>

                    </form>

                </div>

            </main>

        </div>
    );
}

export default CadastrarCliente;