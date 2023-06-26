import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChats, setCurrentChat } from "../../store/reducers/ChatSlice";
import { RootState } from "../../store/Store";
import { GetChats } from "../../api/api";
import { HiOutlinePlus } from "react-icons/hi";
import { BsFillChatRightDotsFill } from "react-icons/bs";
import Modal from "../Modal/Modals";

const Sidebar = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state: RootState) => state.Chat.chats);
  const Id = useSelector((state: RootState) => state.Auth.user_id);

  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (Id) {
          var message = await GetChats(Id);
          dispatch(setChats(message));
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [Id, chats]);

  useEffect(() => {
    if (!loading) {
      console.log(chats);
    }
  }, [loading]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCurrentChat = (index: number): void => {
    dispatch(setCurrentChat(index));
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-20 flex flex-col m-0 shadow-lg bg-primary z-1">
      <div className="text-center pt-2 pb-2">Chats</div>
      {chats.map((chat, index) => (
        <div
          key={index}
          className="sidebar-element group"
          onClick={() => handleCurrentChat(index)}
        >
          <BsFillChatRightDotsFill />
          <span className="sidebar-name group-hover:scale-100">
            {chat.name}
          </span>
        </div>
      ))}
      <div className="sidebar-element group" onClick={handleOpenModal}>
        <HiOutlinePlus size={30} />
        <span className="sidebar-name group-hover:scale-100">Create Chat</span>
      </div>
      {isModalOpen && <Modal handleCloseModal={handleCloseModal} />}
    </div>
  );
};

export default Sidebar;
