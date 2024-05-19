import React, { useState } from 'react';

interface FiltroEstadoProps {
    onStateChange: (state: string) => void;
}

const FiltroEstado : React.FC<FiltroEstadoProps> = ({ onStateChange }) =>  {
    const [selectedState, setSelectedState] = useState<string>('TODOS');

    const handleStateChange = (state: string) => {
        setSelectedState(state);
        onStateChange(state);
    };
    
    const estados = ['TODOS', 'TRANSFERIDO', 'NIEGA CONFIRMACIÓN DATOS', 'CLIENTE NO ENCONTRADO EN DB', 'LLAMANDO', 'CORTÓ CLIENTE', 'MAIL ENVIADO', 'INDEFINIDO', 'NO ENCONTRADO EN DB'];
    
    return(
        <ul className="flex justify-center w-full list-none text-xs text-gray-400 p-3">
           {estados.map((state) => (
                <li
                    key={state}
                    className={`p-2 cursor-pointer hover:text-gray-600 ${selectedState === state ? 'text-gray-600' : ''}`}
                    onClick={() => handleStateChange(state)}
                >
                    {state}
                </li>
            ))}
        </ul>
    )
}

export default FiltroEstado;