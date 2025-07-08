import SideBarChatButton from "../buttons/SideBarChatButton/SideBarChatButton";
import React, { useState } from "react";
import Button from "../buttons/MainButton/Button";
import styles from "./SideBar.module.css";
import SearchButton from "../buttons/SearchButton/SearchButton";

interface ChatButton {
  title: string;
}

function Sidebar() {
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const handleSearchToggle = (expanded: boolean) => {
        setIsSearchExpanded(expanded);
    };

    const [chats, setChats] = useState<ChatButton[]>([]);
    const baseButtonHeight = "60px"; // Базовая высота кнопки

  const handleAddChat = () => {
    const newChat: ChatButton = {
      title: "New chat example",
    };

    setChats((prev) => [...prev, newChat]);
  };

  const handleSearchSubmit = (query: string) => {
        console.log("Поисковый запрос:", query);
        // Добавьте здесь вашу логику поиска
    };

  return (
    <aside className={styles.sidebarContainer}>
      <div className={styles.buttonContainer}>
        <div className={isSearchExpanded ? styles["hide-neighbor"] : styles["add-chat-button"]}>
        <Button text={"+ Add chat"} height={baseButtonHeight} width="250px" borderRadius="2rem" onClick={handleAddChat} />
        </div>
        <SearchButton 
                onSearch={handleSearchSubmit}
                onToggleExpand={handleSearchToggle}
                initialSize={baseButtonHeight}
            />
        </div>
        
        {chats.map((chat, index) => (
        <SideBarChatButton key={index} label={chat.title} />
        ))}
        
    </aside>
  );
}

export default Sidebar;
