
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';

interface FiltroFechaProps {
    onDateChange: (from: Date | null, until: Date | null) => void;
  }
  
  const FiltroFecha: React.FC<FiltroFechaProps> = ({ onDateChange }) => {
    
    const [selectedDateFrom, setSelectedDateFrom] = useState<Date | null>(null);
    const [selectedDateUntil, setSelectedDateUntil] = useState<Date | null>(null);

    const handleDateChange = (from: Date | null, until: Date | null) => {
      setSelectedDateFrom(from);
      setSelectedDateUntil(until);
      onDateChange(from, until);
    };

    const handleClickClean = () => {
        setSelectedDateFrom(null);
        setSelectedDateUntil(null);
        onDateChange(null, null);
    }

    return(
    <div className="flex justify-between p-3 items-center border-b border-slate-50">
        <div className="flex">
            <h4 className="mr-2">Detalle</h4>
            <h4 className="text-slate-400">Dashboards</h4>
        </div>
        <div>
            {(selectedDateFrom !== null || selectedDateUntil !== null) && (
            <span
                onClick={handleClickClean}
                className="cursor-pointer text-slate-400"
            >
                Limpiar filtro
            </span>
            )}

            <div className="flex">
                <div className="relative flex datepicker-wrapper mr-2">
                    <DatePicker 
                        selected={selectedDateFrom} 
                        onChange={(date: Date | null) => handleDateChange(date, selectedDateUntil)} 
                        dateFormat="dd/MM/yyyy"
                        className="datepicker-input"
                        id="datepicker-from"
                    />
                    <label htmlFor="datepicker-from" className="datepicker-label">
                        Desde
                    </label>
                    <img src="./calendario.jpg" alt="calendario" className="calendar-icon"/>
                </div>
                <div className="relative flex datepicker-wrapper">
                    <DatePicker 
                        selected={selectedDateUntil} 
                        onChange={(date: Date | null) => handleDateChange(selectedDateFrom, date)} 
                        dateFormat="dd/MM/yyyy" 
                        className="datepicker-input"
                        id="datepicker-until"
                    />
                    <label htmlFor="datepicker-until" className="datepicker-label">
                        Hasta
                    </label>
                    <img src="./calendario.jpg" alt="calendario" className="calendar-icon"/>
                </div>
            </div>  
        </div>   
    </div>
    )
}

export default FiltroFecha;