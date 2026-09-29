
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Header from "../components/Header/Header.jsx";
import "./EditarServico.css";

function EditarServico() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [valor, setValor] = useState("");

    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState("");

    useEffect(() => {

        async function buscarServico() {

            try {

                const resposta = await api.get(`/servicos/${id}`);

                setNome(resposta.data.nome);
                setValor(resposta.data.valor);

            } catch (error) {

                console.error("Erro ao buscar serviço:", error);

                setErro("Não foi possível carregar o serviço.");

            } finally {

                setCarregando(false);

            }
        }

        buscarServico();

    }, [id]);

    async function salvarAlteracoes(event) {

        event.preventDefault();

        setSalvando(true);
        setErro("");

        try {

            await api.put(`/servicos/${id}`, {
                nome: nome,
                valor: Number(valor)
            });

            navigate("/ver/servico");

        } catch (error) {

            console.error("Erro ao atualizar serviço:", error);

            setErro("Não foi possível atualizar o serviço.");

        } finally {

            setSalvando(false);

        }
    }

    if (carregando) {
        return (
            <>
                <Header />

                <main className="editar-servico-page">
                    <p>Carregando serviço...</p>
                </main>
            </>
        );
    }

    return (
        <>
            <Header />

            <main className="editar-servico-page">

                <div className="editar-servico-card">

                    <h1>Editar serviço</h1>

                    <p className="editar-servico-subtitulo">
                        Altere as informações do serviço abaixo.
                    </p>

                    {erro && (
                        <p className="editar-servico-erro">
                            {erro}
                        </p>
                    )}

                    <form onSubmit={salvarAlteracoes}>

                        <div className="campo">

                            <label htmlFor="nome">
                                Nome do serviço
                            </label>

                            <input
                                id="nome"
                                type="text"
                                value={nome}
                                onChange={(event) => setNome(event.target.value)}
                                required
                            />

                        </div>

                        <div className="campo">

                            <label htmlFor="valor">
                                Valor
                            </label>

                            <input
                                id="valor"
                                type="number"
                                step="0.01"
                                min="0"
                                value={valor}
                                onChange={(event) => setValor(event.target.value)}
                                required
                            />

                        </div>

                        <div className="editar-servico-acoes">

                            <button
                                type="button"
                                className="botao-cancelar"
                                onClick={() => navigate("/servicos/ver")}
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="botao-salvar"
                                disabled={salvando}
                            >
                                {salvando ? "Salvando..." : "Salvar alterações"}
                            </button>

                        </div>

                    </form>

                </div>

            </main>
        </>
    );
}

export default EditarServico;
