import SideBarChatButton from "../buttons/SideBarChatButton/SideBarChatButton";
import { useState } from "react";
import Button from "../buttons/MainButton/Button";
import styles from "./Sidebar.module.css";

interface ChatButton {
  title: string;
}

function Sidebar() {
  const [chats, setChats] = useState<ChatButton[]>([]);

  const handleAddChat = () => {
    const newChat: ChatButton = {
      title: "New chat example",
    };

    setChats((prev) => [...prev, newChat]);
  };

  return (
    <div className={styles.sidebarContainer}>
      {<Button text={"+ Add chat"} fontSize={"16px"} onClick={handleAddChat} />}
      {chats.map((chat, index) => (
        <SideBarChatButton key={index} label={chat.title} />
      ))}
    </div>
  );
}

export default Sidebar;
