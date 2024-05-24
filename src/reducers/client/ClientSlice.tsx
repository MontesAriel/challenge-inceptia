import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Client {
  id: number;
  name: string;
}

interface CaseLog {
  responses: any[]; // Adjust the type based on your actual data
}

interface Case {
  id: number;
  case_uuid: string;
  phone: number;
  case_result: { name: string };
  case_log: CaseLog;
  case_duration: string;
  last_updated: string;
}
interface ClientState {
  clients: Client[];
  selectedClientId: number | null;
  selectedClients: Client[];
  clientData: Case[];
}


const initialState: ClientState = {
  clients: [],
  selectedClientId: null,
  selectedClients: [],
  clientData: [],
};
const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setClients(state, action: PayloadAction<Client[]>) {
      state.clients = action.payload;
    },
    setDataClient(state, action: PayloadAction<Case[]>){
        state.clientData = action.payload
    },
    selectClient(state, action: PayloadAction<number | null>) {
      state.selectedClientId = action.payload;
      if (action.payload !== null) {
        state.selectedClients = [];
      }
    },
    selectAllClients(state, action: PayloadAction<Client[]>) {
      state.selectedClients = action.payload;
    },
    clearSelectedClients(state) {
      state.selectedClients = [];
    },
  },
});

export const { setClients, selectClient, selectAllClients, clearSelectedClients, setDataClient } = clientSlice.actions;

export default clientSlice.reducer;
