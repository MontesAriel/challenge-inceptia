import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { setDataClient } from './reducers/client/ClientSlice';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Loader from './components/loader/Loader';
import { RootState } from './app/store';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false); 
  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchClientDetails = async () => {
      if (user.token.length > 0) {
        setLoading(true); // Set loading to true before fetching data
        try {
          const response = await axios.get(`https://admindev.inceptia.ai/api/v1/inbound-case/?bot=28`, {
            headers: {
              Authorization: `JWT ${user?.token}`,
            },
          });

          if (response.data && response.data.results) {
            dispatch(setDataClient(response.data.results));
          } else {
            console.error('Error: response.data.results is undefined');
          }
        } catch (error) {
          console.error('Error fetching client details:', error);
        } finally {
          setLoading(false); // Set loading to false after fetching data
        }
      }
    };
    fetchClientDetails();
  }, [user.token, dispatch]);

  if (loading) {
    return <Loader />; // Display loader while loading
  }

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;
