import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { selectClient, clearSelectedClients, setClients } from '../../reducers/client/ClientSlice';
import axios from 'axios';
import { useEffect } from 'react';

const Clientes: React.FC = () => {
  const clients = useSelector((state: RootState) => state.client.clients);
  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('https://admindev.inceptia.ai/api/v1/clients/', {
          headers: {
            Authorization:`JWT ${user?.token}`,
          },
        });

        dispatch(setClients(response.data));

      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
    fetchClients();
  }, [dispatch]);

  const onClickCliente = (id: number) => {
    dispatch(selectClient(id));
    dispatch(clearSelectedClients());
  };


  return (
    <div className="max-w-48 w-48 border bg-slate-50">
      <h2 className="font-semibold mb-2 p-2 cursor-pointer">CLIENTES</h2>
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
