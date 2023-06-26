import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { CreateChat } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { clearChats } from "../../store/reducers/ChatSlice";

type ModalProps = {
  handleCloseModal: () => void;
};

const Modal = ({ handleCloseModal }: ModalProps) => {
  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.Auth.user_id);
  const [chatNameVal, setChatNameVal] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id !== null) {
      await CreateChat(id, chatNameVal);
      dispatch(clearChats());
    }
    handleCloseModal();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setChatNameVal(e.currentTarget.value);
  };

  return (
    <div>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={handleOverlayClick}
      >
        <div className="bg-secondary p-6 rounded-lg shadow-xl">
          <AiOutlineClose
            className="ml-auto cursor-pointer"
            onClick={handleCloseModal}
          />
          <h2 className="text-xl mb-4">Create a New Chat</h2>
          <form onSubmit={handleSubmit}>
            <label className="block pb-2 pt-5">Enter a Chat Name:</label>
            <input
              type="text"
              name="Username"
              className="form-input"
              value={chatNameVal}
              onChange={handleInputChange}
            />
            <input
              type="submit"
              value="Create a new chat"
              className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded text-center"
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
