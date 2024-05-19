import { useDispatch, useSelector } from "react-redux"; 
import { RootState } from "../../app/store";
import { selectClient, selectAllClients, clearSelectedClients } from "../../reducers/client/ClientSlice";
import clientes from "../../clientesjson/Clientes.json";

const Clientes: React.FC = () => {
  const clients = useSelector((state: RootState) => state.client.clients);
  const dispatch = useDispatch();

  const onClickCliente = (id: number) => {
    dispatch(selectClient(id));
    dispatch(clearSelectedClients());
  };

  const onClickAllClientes = () => {
    const clientsData = clientes.results.map(item => ({
      id: item.client.id,
      name: item.client.name,
      cases: [
        {
          id: item.id,
          case_uuid: item.case_uuid,
          phone: item.phone,
          case_result: { name: item.case_result.name },
          case_duration: item.case_duration,
          last_updated: item.last_updated,
          extra_metadata: {
            dni: item.extra_metadata.dni,
            grupo: item.extra_metadata.grupo,
            orden: item.extra_metadata.orden,
          },
        }
      ],
    }));
    dispatch(selectAllClients(clientsData));
    dispatch(selectClient(null));
  };

  return (
    <div className="max-w-48 w-48 border bg-slate-50">
      <h2 className="font-semibold mb-2 p-2 cursor-pointer" onClick={onClickAllClientes}>CLIENTES</h2>
      <div className="">
        {clients.map((cliente) => (
          <ul key={cliente.id} className="border-t">
            <li
              onClick={() => onClickCliente(cliente.id)}
              className="cursor-pointer hover:bg-slate-100 hover:font-medium p-2"
            >
              {cliente.name}
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Clientes;
