import { useDispatch, useSelector } from "react-redux"
import Clientes from "../components/clientes/Clientes"
import ContenedorTabla from "../components/contenedorTabla/ContenedorTabla"
import { useNavigate } from "react-router-dom"
import { unsetUser } from "../reducers/user/userSlice"
import { RootState } from "../storeReduce/store"

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    const handleLogout = () => {
        dispatch(unsetUser());
        navigate("/");
    }
    
    return(
        <div>
            <div className="container mx-auto flex justify-between items-center	mt-1">
                {user.email}
                <button 
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-3.5 px-7 rounded-lg bg-white text-blue-gray-900 shadow-md shadow-blue-gray-500/10 hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3"
                    type="button"
                    onClick={handleLogout}
                >
                    Log out
                </button>
            </div>
            <div className='container mx-auto py-10 flex justify-center'>
                <Clientes />
                <ContenedorTabla /> 
            </div>
        </div>
    )
}

export default Home;