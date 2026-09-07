import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import VerClientes from "./pages/VerClientes";
import CadastrarCliente from "./pages/CadastrarCliente";
import CriarAgendamento from "./pages/CriarAgendamento";
import VerAgendamentos from "./pages/VerAgendamentos";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import Servico from "./pages/Servico";
import Calendario from './components/Calendario/Calendario.jsx';

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes/ver" element={<VerClientes />} />
        <Route path="/clientes/cadastrar" element={<CadastrarCliente />} />
        <Route path="/agendamento/criar" element={<CriarAgendamento />} />
        <Route path="/agendamento/ver" element={<VerAgendamentos />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/servicos" element={<Servico />} />
        <Route path="/calendario" element={<Calendario />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;