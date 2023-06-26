import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AuthSlice, { AuthState } from "./reducers/AuthSlice";
import ChatSlice, { ChatState } from "./reducers/ChatSlice";

export interface RootState {
  Auth: AuthState;
  Chat: ChatState;
}

const rootReducer = combineReducers({
  Auth: AuthSlice,
  Chat: ChatSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
