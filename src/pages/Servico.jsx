import { useState, useEffect } from "react";
import Header from "../components/Header/Header.jsx";

function Servicos() {
    // Lista de serviços completa
    const servicosData = [
        {
            id: 1,
            nome: "Design de Sobrancelhas",
            categoria: "Sobrancelhas",
            descricao: "Design personalizado para realçar seu olhar, respeitando a anatomia do seu rosto.",
            preco: 120,
            duracao: "60 min",
            avaliacao: 4.8,
            imagem: "https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?w=400",
            popular: true,
            destaque: true
        },
        {
            id: 2,
            nome: "Micropigmentação Fio a Fio",
            categoria: "Sobrancelhas",
            descricao: "Técnica avançada que cria fios realistas, preenchendo falhas e dando definição.",
            preco: 450,
            duracao: "120 min",
            avaliacao: 4.9,
            imagem: "https://images.unsplash.com/photo-1519415387722-a1c3bb167716?w=400",
            popular: true,
            destaque: true
        },
        {
            id: 3,
            nome: "Alongamento de Cílios",
            categoria: "Cílios",
            descricao: "Cílios mais longos e volumosos com técnica fio a fio, efeito natural ou dramático.",
            preco: 180,
            duracao: "90 min",
            avaliacao: 4.7,
            imagem: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400",
            popular: false,
            destaque: false
        },
        {
            id: 4,
            nome: "Limpeza de Pele Profunda",
            categoria: "Estética",
            descricao: "Tratamento completo com extração de cravos, hidratação e revitalização facial.",
            preco: 150,
            duracao: "60 min",
            avaliacao: 4.6,
            imagem: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400",
            popular: true,
            destaque: false
        },
        {
            id: 5,
            nome: "Massagem Relaxante",
            categoria: "Massagem",
            descricao: "Massagem terapêutica com óleos essenciais para aliviar tensões e promover bem-estar.",
            preco: 200,
            duracao: "60 min",
            avaliacao: 4.9,
            imagem: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400",
            popular: false,
            destaque: true
        },
        {
            id: 6,
            nome: "Depilação a Laser",
            categoria: "Depilação",
            descricao: "Tecnologia de diodo para remoção definitiva dos pelos, indolor e eficaz.",
            preco: 350,
            duracao: "90 min",
            avaliacao: 4.5,
            imagem: "https://images.unsplash.com/photo-1621856436989-54c1b4fa7e8b?w=400",
            popular: false,
            destaque: false
        }
    ];

    // Estados
    const [servicos, setServicos] = useState(servicosData);
    const [filtro, setFiltro] = useState("");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
    const [ordenacao, setOrdenacao] = useState("popularidade");
    const [servicoSelecionado, setServicoSelecionado] = useState(null);

    // Categorias únicas
    const categorias = ["Todos", ...new Set(servicosData.map(s => s.categoria))];

    // Filtrar e ordenar serviços
    useEffect(() => {
        let resultado = [...servicosData];

        if (filtro) {
            resultado = resultado.filter(s =>
                s.nome.toLowerCase().includes(filtro.toLowerCase()) ||
                s.descricao.toLowerCase().includes(filtro.toLowerCase())
            );
        }

        if (categoriaSelecionada !== "Todos") {
            resultado = resultado.filter(s => s.categoria === categoriaSelecionada);
        }

        switch (ordenacao) {
            case "popularidade":
                resultado.sort((a, b) => b.avaliacao - a.avaliacao);
                break;
            case "preco-asc":
                resultado.sort((a, b) => a.preco - b.preco);
                break;
            case "preco-desc":
                resultado.sort((a, b) => b.preco - a.preco);
                break;
            case "nome":
                resultado.sort((a, b) => a.nome.localeCompare(b.nome));
                break;
            default:
                break;
        }

        setServicos(resultado);
    }, [filtro, categoriaSelecionada, ordenacao]);

    // Formatar preço
    const formatarPreco = (preco) => {
        return `R$ ${preco.toFixed(2).replace('.', ',')}`;
    };

    // Gerar estrelas
    const renderizarEstrelas = (avaliacao) => {
        const estrelas = [];
        const inteiras = Math.floor(avaliacao);

        for (let i = 0; i < 5; i++) {
            if (i < inteiras) {
                estrelas.push(<span key={i} style={{ color: "#FFD700", fontSize: "18px" }}>★</span>);
            } else {
                estrelas.push(<span key={i} style={{ color: "#ddd", fontSize: "18px" }}>★</span>);
            }
        }
        return estrelas;
    };

    // ESTILOS (tudo aqui)
    const styles = {
        container: {
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "20px",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            minHeight: "100vh"
        },

        // Hero/Banner
        hero: {
            background: "linear-gradient(135deg, #8B4513 0%, #A0522D 100%)",
            borderRadius: "15px",
            padding: "50px 30px",
            textAlign: "center",
            marginBottom: "40px",
            color: "white"
        },
        heroTitle: {
            fontSize: "2.8rem",
            marginBottom: "10px",
            fontWeight: "bold"
        },
        heroSubtitle: {
            fontSize: "1.2rem",
            opacity: 0.9,
            marginBottom: "20px"
        },
        heroStats: {
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            flexWrap: "wrap"
        },
        heroStat: {
            background: "rgba(255,255,255,0.2)",
            padding: "8px 20px",
            borderRadius: "20px",
            fontSize: "0.9rem"
        },

        // Filtros
        filtrosContainer: {
            display: "flex",
            gap: "20px",
            marginBottom: "30px",
            flexWrap: "wrap",
            alignItems: "center"
        },
        buscaContainer: {
            flex: "1",
            position: "relative",
            minWidth: "250px"
        },
        buscaIcon: {
            position: "absolute",
            left: "15px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#999"
        },
        buscaInput: {
            width: "100%",
            padding: "12px 15px 12px 45px",
            fontSize: "1rem",
            border: "2px solid #ddd",
            borderRadius: "25px",
            outline: "none",
            transition: "border-color 0.3s",
            boxSizing: "border-box"
        },
        filtrosGrupo: {
            display: "flex",
            gap: "10px",
            flexWrap: "wrap"
        },
        filtroSelect: {
            padding: "12px 20px",
            fontSize: "1rem",
            border: "2px solid #ddd",
            borderRadius: "25px",
            outline: "none",
            background: "white",
            cursor: "pointer",
            transition: "border-color 0.3s"
        },

        // Grid
        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "30px",
            marginTop: "20px"
        },

        // Card
        card: {
            background: "white",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            transition: "transform 0.3s, box-shadow 0.3s",
            cursor: "pointer",
            position: "relative"
        },
        cardDestaque: {
            boxShadow: "0 4px 20px rgba(139, 69, 19, 0.3)"
        },
        imagem: {
            width: "100%",
            height: "200px",
            objectFit: "cover"
        },
        badgeDestaque: {
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "#FFD700",
            color: "#333",
            padding: "5px 12px",
            borderRadius: "20px",
            fontSize: "0.8rem",
            fontWeight: "bold"
        },
        badgePopular: {
            position: "absolute",
            top: "10px",
            left: "10px",
            background: "#FF6B6B",
            color: "white",
            padding: "5px 12px",
            borderRadius: "20px",
            fontSize: "0.8rem",
            fontWeight: "bold"
        },
        cardBody: {
            padding: "20px"
        },
        cardHeader: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "10px"
        },
        nomeServico: {
            fontSize: "1.2rem",
            color: "#333",
            margin: "0",
            flex: "1"
        },
        categoriaTag: {
            background: "#F5F0EB",
            color: "#8B4513",
            padding: "3px 10px",
            borderRadius: "12px",
            fontSize: "0.75rem",
            fontWeight: "bold",
            whiteSpace: "nowrap",
            marginLeft: "10px"
        },
        descricao: {
            fontSize: "0.95rem",
            color: "#666",
            lineHeight: "1.5",
            margin: "0 0 15px 0"
        },
        info: {
            display: "flex",
            gap: "15px",
            marginBottom: "12px",
            fontSize: "0.9rem",
            color: "#666"
        },
        infoItem: {
            display: "flex",
            alignItems: "center",
            gap: "5px"
        },
        avaliacao: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "15px"
        },
        estrelas: {
            display: "flex",
            gap: "2px"
        },
        avaliacaoNumero: {
            color: "#666",
            fontSize: "0.9rem"
        },
        cardFooter: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "15px",
            borderTop: "1px solid #eee"
        },
        preco: {
            fontSize: "1.4rem",
            fontWeight: "bold",
            color: "#8B4513"
        },
        botoesCard: {
            display: "flex",
            gap: "10px"
        },
        botaoAgendar: {
            padding: "10px 25px",
            background: "#8B4513",
            color: "white",
            border: "none",
            borderRadius: "25px",
            fontSize: "0.9rem",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background 0.3s"
        },
        botaoWhatsapp: {
            width: "40px",
            height: "40px",
            background: "#25D366",
            color: "white",
            border: "none",
            borderRadius: "50%",
            fontSize: "1.2rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.3s"
        },

        // Sem resultados
        semResultados: {
            textAlign: "center",
            padding: "60px 20px",
            color: "#999",
            gridColumn: "1 / -1"
        },
        semResultadosSub: {
            color: "#bbb"
        },

        // Modal
        modal: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px"
        },
        modalContent: {
            background: "white",
            borderRadius: "15px",
            maxWidth: "600px",
            width: "100%",
            maxHeight: "90vh",
            overflow: "auto",
            position: "relative",
            animation: "modalFade 0.3s"
        },
        modalClose: {
            position: "absolute",
            top: "15px",
            right: "15px",
            background: "none",
            border: "none",
            fontSize: "1.8rem",
            cursor: "pointer",
            color: "#666",
            zIndex: 1
        },
        modalImagem: {
            width: "100%",
            height: "300px",
            overflow: "hidden"
        },
        modalImagemImg: {
            width: "100%",
            height: "100%",
            objectFit: "cover"
        },
        modalBody: {
            padding: "30px"
        },
        modalCategoria: {
            display: "inline-block",
            background: "#F5F0EB",
            color: "#8B4513",
            padding: "5px 15px",
            borderRadius: "12px",
            fontSize: "0.8rem",
            fontWeight: "bold",
            marginBottom: "15px"
        },
        modalInfo: {
            background: "#F9F6F2",
            padding: "15px",
            borderRadius: "8px",
            margin: "15px 0",
            display: "grid",
            gap: "10px"
        },
        modalBotao: {
            width: "100%",
            padding: "15px",
            background: "#8B4513",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "1.1rem",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "15px",
            transition: "background 0.3s"
        },

        // Footer
        footer: {
            textAlign: "center",
            padding: "30px",
            marginTop: "50px",
            backgroundColor: "#F5F0EB",
            color: "#666",
            borderRadius: "10px"
        },

        // Estatísticas
        estatisticas: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "20px",
            marginTop: "50px",
            padding: "30px",
            background: "#F9F6F2",
            borderRadius: "15px"
        },
        estatisticaItem: {
            textAlign: "center"
        },
        estatisticaNumero: {
            display: "block",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#8B4513"
        },
        estatisticaLabel: {
            color: "#666",
            fontSize: "0.9rem"
        }
    };

    // Adiciona o keyframe animation via style global
    const modalKeyframes = `
    @keyframes modalFade {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
  `;

    return (
        <div>
            <Header />

            {/* Injetando keyframes para animação do modal */}
            <style>{modalKeyframes}</style>

            <div style={styles.container}>
                {/* Hero/Banner */}
                <div style={styles.hero}>
                    <h1 style={styles.heroTitle}>✨ Nossos Serviços</h1>
                    <p style={styles.heroSubtitle}>
                        Conheça todos os serviços oferecidos pelo Studio Vivis
                    </p>
                    <div style={styles.heroStats}>
                        <span style={styles.heroStat}>💄 {servicosData.length} Serviços</span>
                        <span style={styles.heroStat}>⭐ Avaliação média 4.8</span>
                        <span style={styles.heroStat}>👩‍🎨 Especialistas qualificados</span>
                    </div>
                </div>

                {/* Filtros */}
                <div style={styles.filtrosContainer}>
                    <div style={styles.buscaContainer}>
                        <span style={styles.buscaIcon}>🔍</span>
                        <input
                            type="text"
                            placeholder="Buscar serviço..."
                            value={filtro}
                            onChange={(e) => setFiltro(e.target.value)}
                            style={styles.buscaInput}
                            onFocus={(e) => e.target.style.borderColor = "#8B4513"}
                            onBlur={(e) => e.target.style.borderColor = "#ddd"}
                        />
                    </div>

                    <div style={styles.filtrosGrupo}>
                        <select
                            value={categoriaSelecionada}
                            onChange={(e) => setCategoriaSelecionada(e.target.value)}
                            style={styles.filtroSelect}
                            onFocus={(e) => e.target.style.borderColor = "#8B4513"}
                            onBlur={(e) => e.target.style.borderColor = "#ddd"}
                        >
                            {categorias.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>

                        <select
                            value={ordenacao}
                            onChange={(e) => setOrdenacao(e.target.value)}
                            style={styles.filtroSelect}
                            onFocus={(e) => e.target.style.borderColor = "#8B4513"}
                            onBlur={(e) => e.target.style.borderColor = "#ddd"}
                        >
                            <option value="popularidade">Mais Popular</option>
                            <option value="preco-asc">Menor Preço</option>
                            <option value="preco-desc">Maior Preço</option>
                            <option value="nome">A-Z</option>
                        </select>
                    </div>
                </div>

                {/* Grid de Serviços */}
                {servicos.length > 0 ? (
                    <div style={styles.grid}>
                        {servicos.map((servico) => (
                            <div
                                key={servico.id}
                                style={{
                                    ...styles.card,
                                    ...(servico.destaque ? styles.cardDestaque : {})
                                }}
                                onClick={() => setServicoSelecionado(servico)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translateY(-5px)";
                                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
                                }}
                            >
                                {servico.destaque && (
                                    <div style={styles.badgeDestaque}>🌟 Destaque</div>
                                )}
                                {servico.popular && (
                                    <div style={styles.badgePopular}>🔥 Popular</div>
                                )}

                                <img
                                    src={servico.imagem}
                                    alt={servico.nome}
                                    style={styles.imagem}
                                />

                                <div style={styles.cardBody}>
                                    <div style={styles.cardHeader}>
                                        <h3 style={styles.nomeServico}>{servico.nome}</h3>
                                        <span style={styles.categoriaTag}>{servico.categoria}</span>
                                    </div>

                                    <p style={styles.descricao}>{servico.descricao}</p>

                                    <div style={styles.info}>
                                        <span style={styles.infoItem}>⏱ {servico.duracao}</span>
                                        <span style={styles.infoItem}>📅 Disponível</span>
                                    </div>

                                    <div style={styles.avaliacao}>
                                        <div style={styles.estrelas}>
                                            {renderizarEstrelas(servico.avaliacao)}
                                        </div>
                                        <span style={styles.avaliacaoNumero}>
                      {servico.avaliacao}
                    </span>
                                    </div>

                                    <div style={styles.cardFooter}>
                                        <span style={styles.preco}>{formatarPreco(servico.preco)}</span>
                                        <div style={styles.botoesCard}>
                                            <button
                                                style={styles.botaoAgendar}
                                                onMouseEnter={(e) => e.currentTarget.style.background = "#6B3410"}
                                                onMouseLeave={(e) => e.currentTarget.style.background = "#8B4513"}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    alert(`Agendando ${servico.nome}...`);
                                                }}
                                            >
                                                Agendar
                                            </button>
                                            <button
                                                style={styles.botaoWhatsapp}
                                                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                                                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    window.open('https://wa.me/5511999999999', '_blank');
                                                }}
                                            >
                                                💬
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={styles.semResultados}>
                        <p>😕 Nenhum serviço encontrado</p>
                        <p style={styles.semResultadosSub}>Tente ajustar seus filtros</p>
                    </div>
                )}

                {/* Estatísticas */}
                <div style={styles.estatisticas}>
                    <div style={styles.estatisticaItem}>
                        <span style={styles.estatisticaNumero}>{servicosData.length}</span>
                        <span style={styles.estatisticaLabel}>Serviços</span>
                    </div>
                    <div style={styles.estatisticaItem}>
                        <span style={styles.estatisticaNumero}>1.2k+</span>
                        <span style={styles.estatisticaLabel}>Clientes Atendidos</span>
                    </div>
                    <div style={styles.estatisticaItem}>
                        <span style={styles.estatisticaNumero}>4.8</span>
                        <span style={styles.estatisticaLabel}>Avaliação Média</span>
                    </div>
                    <div style={styles.estatisticaItem}>
                        <span style={styles.estatisticaNumero}>5</span>
                        <span style={styles.estatisticaLabel}>Anos de Experiência</span>
                    </div>
                </div>

                <footer style={styles.footer}>
                    <p>© 2026 Studio Vivis - Todos os direitos reservados</p>
                </footer>
            </div>

            {/* Modal de Detalhes */}
            {servicoSelecionado && (
                <div style={styles.modal} onClick={() => setServicoSelecionado(null)}>
                    <div
                        style={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            style={styles.modalClose}
                            onClick={() => setServicoSelecionado(null)}
                            onMouseEnter={(e) => e.currentTarget.style.color = "#8B4513"}
                            onMouseLeave={(e) => e.currentTarget.style.color = "#666"}
                        >
                            ✕
                        </button>

                        <div style={styles.modalImagem}>
                            <img
                                src={servicoSelecionado.imagem}
                                alt={servicoSelecionado.nome}
                                style={styles.modalImagemImg}
                            />
                        </div>

                        <div style={styles.modalBody}>
                            <h2 style={{ margin: "0 0 5px 0" }}>{servicoSelecionado.nome}</h2>
                            <span style={styles.modalCategoria}>
                {servicoSelecionado.categoria}
              </span>
                            <p style={{ color: "#666", lineHeight: "1.6" }}>
                                {servicoSelecionado.descricao}
                            </p>
                            <div style={styles.modalInfo}>
                                <div>
                                    <strong>⏱ Duração:</strong> {servicoSelecionado.duracao}
                                </div>
                                <div>
                                    <strong>💰 Preço:</strong> {formatarPreco(servicoSelecionado.preco)}
                                </div>
                                <div>
                                    <strong>⭐ Avaliação:</strong> {servicoSelecionado.avaliacao}
                                </div>
                            </div>
                            <button
                                style={styles.modalBotao}
                                onMouseEnter={(e) => e.currentTarget.style.background = "#6B3410"}
                                onMouseLeave={(e) => e.currentTarget.style.background = "#8B4513"}
                                onClick={() => {
                                    alert(`Agendando ${servicoSelecionado.nome}...`);
                                    setServicoSelecionado(null);
                                }}
                            >
                                📅 Agendar Agora
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Servicos;