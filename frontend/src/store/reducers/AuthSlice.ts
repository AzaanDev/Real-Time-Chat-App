import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user_id: string | null;
  name: string | null;
  token: string | null;
}

export interface SetCredentialsPayload {
  user_id: string;
  name: string;
  accessToken: string;
}

const AuthSlice = createSlice({
  name: "auth",
  initialState: { user_id: null, token: null, name: null } as AuthState,
  reducers: {
    setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
      const { user_id, accessToken, name } = action.payload;
      state.user_id = user_id;
      state.token = accessToken;
      state.name = name;
    },
    clearCredentials: (state) => {
      state.user_id = null;
      state.token = null;
      state.name = null;
    },
  },
});

export const { setCredentials, clearCredentials } = AuthSlice.actions;

export default AuthSlice.reducer;
