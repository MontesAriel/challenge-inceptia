// src/reducers/client/clientSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Case {
  id: number;
  case_uuid: string;
  phone: number;
  case_result: { name: string };
  case_duration: string;
  last_updated: string;
  extra_metadata: { dni: string; grupo: string; orden: string };
}

interface Client {
  id: number;
  name: string;
  cases: Case[];
}

interface ClientState {
  clients: Client[];
  selectedClientId: number | null;
  selectedClients: Client[];
}

interface ApiResponse {
  results: {
    id: number;
    client: { id: number; name: string };
    case_uuid: string;
    phone: number;
    case_result: { name: string };
    case_duration: string;
    last_updated: string;
    extra_metadata: { dni: string; grupo: string; orden: string };
  }[];
}

const initialState: ClientState = {
  clients: [],
  selectedClientId: null,
  selectedClients: [],
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setClients(state, action: PayloadAction<ApiResponse['results']>) {
      state.clients = action.payload.map((item) => ({
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
          },
        ],
      }));
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

export const { setClients, selectClient, selectAllClients, clearSelectedClients } = clientSlice.actions;

export default clientSlice.reducer;
