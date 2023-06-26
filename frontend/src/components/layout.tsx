import Sidebar from "./Sidebar/Sidebar";
import ChatPage from "./Chat/Chat";

const Layout = () => {
  return (
    <div className="text-white relative overflow-hidden">
      <Sidebar />
      <div
        className="h-screen m-0 ml-20 bg-secondary justify-center z-0"
        style={{ width: "calc(100vw - 5rem)" }}
      >
        <ChatPage />
      </div>
    </div>
  );
};

export default Layout;
