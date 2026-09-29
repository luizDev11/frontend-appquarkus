import {useState} from "react";
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

        <div className="cadastro-page">

            <Header/>

            <main className="cadastro-container">

                <div className="cadastro-card">

                    <h1>Cadastrar Serviço</h1>

                    <p className="cadastro-subtitulo">
                        Adicione um novo serviço ao seu estúdio
                    </p>

                    {mensagem && (
                        <p className="mensagem-sucesso">
                            {mensagem}
                        </p>
                    )}

                    <form onSubmit={cadastrarServico} className="cadastro-form">

                        <div className="campo">

                            <label htmlFor="nome">
                                Nome
                            </label>

                            <input
                                type="text"
                                placeholder="Nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />

                        </div>

                        <div className="campo">

                            <label htmlFor="Valor">
                                Valor
                            </label>

                            <input
                                type="text"
                                placeholder="Valor"
                                value={valor}
                                onChange={(e) => setValor(e.target.value)}
                            />

                        </div>

                        <button type="submit" className="botao-salvar">
                            Salvar Serviço
                        </button>

                    </form>
                </div>
            </main>
        </div>

    );
}

export default CadastrarServico;