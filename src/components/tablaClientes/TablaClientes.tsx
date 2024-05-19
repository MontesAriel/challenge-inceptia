import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface TablaClientesProps {
  searchQuery: string;
  dateFrom: Date | null;
  dateUntil: Date | null;
  selectedState: string;
}

const TablaClientes: React.FC<TablaClientesProps> = ({ searchQuery, dateFrom, dateUntil, selectedState }) => {
  
  const selectedClientId = useSelector((state: RootState) => state.client.selectedClientId);
  const clients = useSelector((state: RootState) => state.client.clients);
  const selectedClients = useSelector((state: RootState) => state.client.selectedClients);

  let casesToShow: Case[] = [];

  if (selectedClients.length > 0) {
    // Show all cases from all clients
    casesToShow = selectedClients.flatMap(client => client.cases);
  } else if (selectedClientId === null) {
    // Show all cases from all clients
    casesToShow = clients.flatMap(client => client.cases);
  } else {
    const selectedClient = clients.find(client => client.id === selectedClientId);
    if (selectedClient) {
      casesToShow = selectedClient.cases;
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
      if (dateFrom && caseDate < dateFrom) {
        return false;
      }
      if (dateUntil && caseDate > dateUntil) {
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

  console.log({casesToShow})
  return (
    <table className="table-auto">
      <thead className="bg-emerald-300 text-current">
        <tr>
          <th className="border border-slate-100 p-5 min-w-48">Gestionado</th>
          <th className="border border-slate-100 p-5 min-w-20">ID</th>
          <th className="border border-slate-100 p-5 min-w-36">Teléfono</th>
          <th className="border border-slate-100 p-5 min-w-28">DNI</th>
          <th className="border border-slate-100 p-5 min-w-24	">Grupo</th>
          <th className="border border-slate-100 p-5 min-w-24	">Orden</th>
          <th className="border border-slate-100 p-5 min-w-28	">Llamada</th>
          <th className="border border-slate-100 p-5 min-w-72">Estado</th>
        </tr>
      </thead>
      <tbody>
        {casesToShow.length > 0 ? casesToShow.map(caseItem => (
          <tr key={caseItem.id}>
            <td className="border border-slate-100 p-5 min-w-48">{caseItem.last_updated}</td>
            <td className="border border-slate-100 p-5 min-w-20">{caseItem.case_uuid}</td>
            <td className="border border-slate-100 p-5 min-w-28	">{caseItem.phone}</td>
            <td className="border border-slate-100 p-5 min-w-28	">{caseItem.extra_metadata.dni}</td>
            <td className="border border-slate-100 p-5 min-w-24	">{caseItem.extra_metadata.grupo}</td>
            <td className="border border-slate-100 p-5 min-w-24	">{caseItem.extra_metadata.orden}</td>
            <td className="border border-slate-100 p-5 min-w-28	">{caseItem.case_duration}</td>
            <td className="border border-slate-100 p-5 min-w-72">{caseItem.case_result.name}</td>
          </tr>
        ))
        :  
          <tr>
            <td className="border border-slate-100 p-5 text-center font-semibold" colSpan={8}>No hay datos coincidentes.</td>
          </tr>
        }
      </tbody>
    </table>
  );
};

export default TablaClientes;
