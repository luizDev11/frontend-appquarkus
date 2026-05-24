import api from "../services/api";
import { useState } from "react";

function Clientes() {

    const [nome, setNome] = useState("");

    const [telefone, setTelefone] = useState("");

    async function cadastrarCliente(e) {
        
        e.preventDefault();

        const cliente = {
            nome,
            telefone
        }
        
        await api.post("/clientes",cliente);

        console.log ("Cliente cadastrado")
    }

    return (
        <div>
            <h1>Clientes</h1>

            <form onSubmit={cadastrarCliente}>

                <p>Nome: {nome}</p>

                <input type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <br />
                <br />

                <p>
                    Telefone: {telefone}
                </p>

                <input type="text"
                    placeholder="Telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                />

                <br />
                <br />

                <button type="submit">
                    Salvar
                </button>

            </form>

        </div>
    )
}

export default Clientes;