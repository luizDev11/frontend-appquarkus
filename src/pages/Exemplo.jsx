import { useState } from "react";

function Exemplo(){
    const [contador, setContador] = useState(0);
    function incrementar(){
        setContador(contador + 1);
    }
    return (
        <div>
            <p>Contador: {contador}</p>
            <button onClick={incrementar}>Incrementar</button>
        </div>
    )
}
export default Exemplo;