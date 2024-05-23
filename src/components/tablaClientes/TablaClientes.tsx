import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import BotMensajes from '../botMensajes/BotMensajes';

interface TablaClientesProps {
  searchQuery: string;
  dateFrom: Date | null;
  dateUntil: Date | null;
  selectedState: string;
}


interface CaseLog {
  text: string;
  time: number;
}

const TablaClientes: React.FC<TablaClientesProps> = ({ searchQuery, dateFrom, dateUntil, selectedState }) => {
  const selectedClientId = useSelector((state: RootState) => state.client.selectedClientId);
  const clients = useSelector((state: RootState) => state.client.clients);
  const infoClients = useSelector((state: RootState) => state.client.clientData);
  const [viewBot, setViewBot] = useState<boolean>(false);
  const [infoBot, setInfoBot] = useState<CaseLog[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 5;

  let casesToShow: any[] = [];


  if (infoClients.length > 0) {
    // Show all cases from all clients
    casesToShow = infoClients.flatMap(client => client);
  } else if (selectedClientId === null) {
    // Show all cases from all clients
    casesToShow = clients.flatMap(client => client);
  } else {
    const selectedClient = clients.find(client => client.id === selectedClientId);
    if (selectedClient) {
      casesToShow = infoClients;
    }
  }

  if (searchQuery) {
    casesToShow = casesToShow.filter(caseItem => 
      caseItem.case_uuid.includes(searchQuery) ||
      caseItem.phone.toString().includes(searchQuery)
    );
  }
  
  if (dateFrom || dateUntil) {
    casesToShow = casesToShow.filter(caseItem => {
      const caseDate = new Date(caseItem.last_updated);
      if (isNaN(caseDate.getTime())) {
        return false; // Invalid date, exclude from results
      }
      if (dateFrom && caseDate < new Date(dateFrom)) {
        return false;
      }
      if (dateUntil && caseDate > new Date(dateUntil)) {
        return false;
      }
      return true;
    });
  }

  if (selectedState !== 'TODOS') {
    casesToShow = casesToShow.filter(caseItem =>
      caseItem.case_result.name.toLowerCase().includes(selectedState.toLowerCase())
    );
  }

  const handleClickMsjs = (id: number) => {
    setViewBot(true);
    const bot = infoClients.find((client) => client.id == id);
    if (bot) {
      setInfoBot(bot.case_log);
    }
  }

  // Paginación
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = casesToShow.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(casesToShow.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <table className="table-auto">
        <thead className="bg-emerald-300 text-current">
          <tr>
            <th className="border border-slate-100 p-5 min-w-56">Gestionado</th>
            <th className="border border-slate-100 p-5 min-w-24	">ID</th>
            <th className="border border-slate-100 p-5 min-w-40">Teléfono</th>
            <th className="border border-slate-100 p-5 min-w-28">Llamada</th>
            <th className="border border-slate-100 p-5 min-w-80">Estado</th>
            <th className="border border-slate-100 p-5 min-w-32	">Respuestas</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? currentRows.map(data => (
            <tr key={data.id}>
              <td className="border border-slate-100 p-5 min-w-56">{data.last_updated}</td>
              <td className="border border-slate-100 p-5 min-w-24	">{data.case_uuid}</td>
              <td className="border border-slate-100 p-5 min-w-40">{data.phone}</td>
              <td className="border border-slate-100 p-5 min-w-28">{data.case_duration}</td>
              <td className="border border-slate-100 p-5 min-w-80">{data.case_result.name}</td>
              <td className="border border-slate-100 p-5 flex justify-center min-w-32">
                <img onClick={() => handleClickMsjs(data.id)} src='./icono-msj.webp' alt='icono mensaje' className='w-7 cursor-pointer'/>
              </td>
            </tr>
          ))
          :  
            <tr>
              <td className="border border-slate-100 p-5 text-center font-semibold" colSpan={8}>No hay datos coincidentes.</td>
            </tr>
          }
        </tbody>
      </table>
      <div className="flex flex-1 px-4 py-3 mt-12 bg-white border-t border-gray-200 shadow-md sm:px-6">
        <div className="flex justify-between flex-1 sm:hidden">
          <button 
            type="button" 
            className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md sm:rounded-none hover:bg-gray-50"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button 
            type="button" 
            className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md sm:rounded-none hover:bg-gray-50"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div className="relative z-0 flex justify-between w-full -space-x-px rounded-md" aria-label="Pagination">
            <button 
              type="button" 
              className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md sm:rounded-none hover:bg-gray-50 sm:rounded-l-md"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous Page
            </button>
            <button 
              type="button" 
              className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md sm:rounded-none hover:bg-gray-50 sm:rounded-r-md"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next Page
            </button>
          </div>
        </div>
      </div>

      {viewBot && <BotMensajes setViewBot={setViewBot} responseBot={{ responses: infoBot }} />}

    </>
  );
};

export default TablaClientes;
