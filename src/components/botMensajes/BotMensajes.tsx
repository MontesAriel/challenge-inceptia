interface BotMensajesProps {
    setViewBot: (view: boolean) => void;
    responseBot: CaseLog[];
}

interface CaseLog {
    text: string;
    time: number;
}

const BotMensajes: React.FC<BotMensajesProps> = ({setViewBot, responseBot}) => {

    function formatTimestamp(timestamp:number) {
        // Crear un objeto Date con el timestamp (multiplicado por 1000 porque Date espera milisegundos)
        const date = new Date(timestamp * 1000);
      
        // Obtener los componentes de la fecha y hora
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Los meses empiezan desde 0
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
      
        // Añadir ceros delante de los minutos y segundos si son menores a 10
        const paddedMinutes = minutes < 10 ? '0' + minutes : minutes;
        const paddedSeconds = seconds < 10 ? '0' + seconds : seconds;
      
        // Formatear la fecha y hora
        const formattedDate = `${day}-${month}-${year} ${hours}:${paddedMinutes}:${paddedSeconds}`;
      
        return formattedDate;
      }
      
      console.log({responseBot})
// Formatear la fecha y hora

    return(
        <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">

        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
    
        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-6 text-left px-6">
            
                {responseBot.map((msj, index:number) =>(
                    <div key={index} className="flex items-center mt-5 p-2 border-b">
                        <img src="./bot.png" alt="bot" className="w-12 mr-5"/>
                        <div className="w-full">
                            <p >{ msj.text} </p>
                            <div className="flex justify-end mt-2">
                                <span className="text-xs text-slate-400	">{formatTimestamp(msj.time)}</span>
                            </div>
                        </div>
                    </div>
                    ))
                }
                
                <div className="mt-4 flex justify-end">
                    <button 
                        onClick={() => setViewBot(false)}
                        className="modal-close px-4 bg-gray-100 p-3 rounded-lg text-black hover:bg-gray-200"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    
    </div>
    )
}

export default BotMensajes;