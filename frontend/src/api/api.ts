import client from "./client";

const SignUp = async (payload: string): Promise<any> => {
  try {
    const r = await client.post("/api/Signup/", payload);
    return r.data;
  } catch (e) {
    console.log(e);
  }
};

const Login = async (payload: string) => {
  try {
    const r = await client.post("/api/Login/", payload);
    return r.data;
  } catch (e) {
    console.log(e);
  }
};

const CreateChat = async (id: string, chatname: string) => {
  try {
    const r = await client.post("/api/CreateChat", {
      Id: id,
      ChatName: chatname,
    });
    return r.data;
  } catch (e) {
    console.log(e);
  }
};

const GetChats = async (Id: string) => {
  try {
    const r = await client.get("/api/GetChats", {
      params: {
        Id: Id,
      },
    });
    return r.data;
  } catch (e) {
    console.log(e);
  }
};

const GetMessages = async (Id: string) => {
  try {
    const r = await client.get("/api/GetMessages", {
      params: {
        Id: Id,
      },
    });
    return r.data;
  } catch (e) {
    console.log(e);
  }
};

const SendMessage = async (payload: string) => {
  try {
    const r = await client.post("/api/SendMessage/", payload);
    return r.data;
  } catch (e) {
    console.log(e);
  }
};

export { SignUp, Login, GetChats, GetMessages, SendMessage, CreateChat };
