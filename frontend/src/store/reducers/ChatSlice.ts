import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Chat {
  id: string;
  name: string;
  participants: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatState {
  chats: Chat[];
  currentChat?: number;
}

const ChatSlice = createSlice({
  name: "chat",
  initialState: { chats: [] } as ChatState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    clearChats: (state) => {
      state.chats = [];
    },
    setCurrentChat: (state, action: PayloadAction<number>) => {
      state.currentChat = action.payload;
    },
  },
});

export const { setChats, clearChats, setCurrentChat } = ChatSlice.actions;

export default ChatSlice.reducer;
