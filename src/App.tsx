import './App.css'
import Clientes from './components/clientes/Clientes'
import ContenedorTabla from './components/contenedorTabla/ContenedorTabla'
import { useDispatch } from 'react-redux'
import { setClients } from './reducers/client/ClientSlice'
import clientes from './clientesjson/Clientes.json'
import { useEffect } from 'react'

const App: React.FC = () => {
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(setClients(clientes.results));
  }, [dispatch]);

  return (
    <div className='container mx-auto py-10 flex justify-center'>
      <Clientes />
      <ContenedorTabla />
    </div>
  )
}

export default App
