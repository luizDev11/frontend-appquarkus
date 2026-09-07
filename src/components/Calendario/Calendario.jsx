import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendario.css';

function Calendario() {
    // Estado para armazenar a data selecionada
    const [dataSelecionada, setDataSelecionada] = useState(new Date());

    // Estado para armazenar eventos (exemplo)
    const [eventos, setEventos] = useState([]);

    // Função chamada quando o usuário clica em uma data
    const handleDataChange = (novaData) => {
        setDataSelecionada(novaData);
        console.log('Data selecionada:', novaData);
        console.log('Dia:', novaData.getDate());
        console.log('Mês:', novaData.getMonth() + 1);
        console.log('Ano:', novaData.getFullYear());

        // Aqui você pode buscar eventos para essa data
        // buscarEventos(novaData);
    };

    // Função para formatar a data
    const formatarData = (data) => {
        return data.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Função para verificar se uma data tem evento (exemplo)
    const temEvento = (data) => {
        // Aqui você pode verificar se existem eventos para essa data
        // Por enquanto, vamos marcar alguns dias aleatórios
        const dia = data.getDate();
        return dia === 5 || dia === 12 || dia === 20;
    };

    // Função para customizar a aparência dos dias
    const customizarDia = ({ date, view }) => {
        // Só customizar na visão de mês
        if (view === 'month') {
            // Se o dia tiver evento, adiciona uma classe
            if (temEvento(date)) {
                return 'dia-com-evento';
            }

            // Se for o dia atual, adiciona outra classe
            const hoje = new Date();
            if (date.getDate() === hoje.getDate() &&
                date.getMonth() === hoje.getMonth() &&
                date.getFullYear() === hoje.getFullYear()) {
                return 'dia-atual';
            }
        }
        return null;
    };

    return (
        <div className="calendario-container">
            {/* Cabeçalho com a data selecionada */}
            <div className="calendario-header">
                <h2>📅 Calendário</h2>
                <p className="data-selecionada">
                    {formatarData(dataSelecionada)}
                </p>
            </div>

            {/* O Calendário em si */}
            <div className="calendario-wrapper">
                <Calendar
                    onChange={handleDataChange}
                    value={dataSelecionada}
                    className="calendario-componente"
                    // Propriedades úteis
                    minDate={new Date(2024, 0, 1)} // Data mínima
                    maxDate={new Date(2025, 11, 31)} // Data máxima
                    nextLabel="▶" // Botão próximo mês
                    prevLabel="◀" // Botão mês anterior
                    next2Label="▶▶" // Botão próximo ano
                    prev2Label="◀◀" // Botão ano anterior
                    locale="pt-BR" // Português
                    tileClassName={customizarDia} // Customiza dias
                    // Desabilitar fins de semana (opcional)
                    tileDisabled={({ date, view }) => {
                        if (view === 'month') {
                            // Desabilita domingos
                            return date.getDay() === 0;
                        }
                        return false;
                    }}
                />
            </div>

            {/* Área de informações adicionais */}
            <div className="calendario-footer">
                <div className="legenda">
                    <span className="legenda-item">
                        <span className="ponto-azul"></span> Dia selecionado
                    </span>
                    <span className="legenda-item">
                        <span className="ponto-verde"></span> Dia com evento
                    </span>
                    <span className="legenda-item">
                        <span className="ponto-destaque"></span> Hoje
                    </span>
                </div>

                {/* Botão para limpar seleção */}
                <button
                    className="btn-limpar"
                    onClick={() => setDataSelecionada(new Date())}
                >
                    Voltar para hoje
                </button>
            </div>
        </div>
    );
}

export default Calendario;