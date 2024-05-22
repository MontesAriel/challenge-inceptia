import React from "react";
import FiltroBusqueda from "../filtroBusqueda/FiltroBusqueda";
import FiltroEstado from "../filtroEstado/FiltroEstado";
import FiltroFecha from "../filtroFecha/FiltroFecha";
import TablaClientes from "../tablaClientes/TablaClientes";
import { useState } from "react";

const ContenedorTabla: React.FC = () => {
    
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [dateFrom, setDateFrom] = useState<Date | null>(null);
    const [dateUntil, setDateUntil] = useState<Date | null>(null);
    const [selectedState, setSelectedState] = useState<string>('TODOS');

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleDateChange = (from: Date | null, until: Date | null) => {
        setDateFrom(from);
        setDateUntil(until);
    };

    const handleStateChange = (state: string) => {
    setSelectedState(state);
    };

    return(
        <div className="flex flex-col border rounded-sm border-slate-100	">
            <FiltroBusqueda onSearch={handleSearch}/>
            <FiltroFecha onDateChange={handleDateChange}/>
            <FiltroEstado onStateChange={handleStateChange}/>
            <TablaClientes 
                searchQuery={searchQuery} 
                dateFrom={dateFrom} dateUntil={dateUntil}
                selectedState={selectedState} 
            />
        </div>
    )
}

export default ContenedorTabla;