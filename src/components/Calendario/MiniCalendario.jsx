import React, { useState } from 'react';
import './MiniCalendario.css';
import { useNavigate } from 'react-router-dom';

function MiniCalendario() {
    const [dataSelecionada, setDataSelecionada] = useState(new Date());
    const navigate = useNavigate();
    const hoje = new Date();

    const ano = dataSelecionada.getFullYear();
    const mes = dataSelecionada.getMonth();
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);

    const espacosIniciais = primeiroDia.getDay();
    const dias = [];

    // 🔥 ADICIONEI: Cabeçalho com dias da semana
    const diasSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

    // 🔥 ADICIONEI: Cabeçalho no array
    dias.push(
        <div key="header" className="calendario-header">
            {diasSemana.map((dia, index) => (
                <span
                    key={dia}
                    className={`header-dia ${index === 0 ? 'header-domingo' : ''}`}
                >
                    {dia}
                </span>
            ))}
        </div>
    );

    // Espaços vazios
    for (let i = 0; i < espacosIniciais; i++) {
        dias.push(<div key={`vazio-${i}`} className="dia-vazio"></div>);
    }

    // Dias do mês
    for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
        const dataAtual = new Date(ano, mes, dia);
        const isHoje = dataAtual.toDateString() === hoje.toDateString();
        // 🔥 ADICIONEI: Verifica se é domingo
        const isDomingo = dataAtual.getDay() === 0;

        dias.push(
            <div
                key={dia}
                // 🔥 MODIFIQUEI: Adicionei classe 'domingo'
                className={`dia ${isHoje ? 'hoje' : ''} ${isDomingo ? 'domingo' : ''}`}
                onClick={() => {
                    setDataSelecionada(dataAtual);
                    const dataParam = dataAtual.toISOString().split('T')[0];
                    navigate(`/calendario?data=${dataParam}`);
                }}
            >
                {dia}
            </div>
        );
    }

    return (
        <div className="mini-calendario-simples">
            <div className="calendario-grid">
                {dias}
            </div>
        </div>
    );
}

export default MiniCalendario;