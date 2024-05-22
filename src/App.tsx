import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import {  setDataClient } from './reducers/client/ClientSlice';
import { useEffect } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

const App: React.FC = () => {
  
  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await axios.get(`https://admindev.inceptia.ai/api/v1/inbound-case/?bot=28`, {
          headers: {
            Authorization:`JWT ${user?.token}`,
          },
        });

        if (response.data && response.data.results) {

          dispatch(setDataClient(response.data.results));
        } else {
          console.error('Error: response.data.results es indefinido');
        }
      } catch (error) {
        console.error('Error fetching client details:', error);
      }
    };
    fetchClientDetails();
  }, [ dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;
