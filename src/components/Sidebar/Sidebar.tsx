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
    const baseButtonHeight = "40px"; // Базовая высота кнопки

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
        <div className={isSearchExpanded ? styles.hideNeighbor : styles.addChatButton}>
        <Button text={"+ Add chat"} height={baseButtonHeight} width="100%" borderRadius="2rem" onClick={handleAddChat} />
        </div>
        <nav className={styles.searchButton}>
        <SearchButton 
                onSearch={handleSearchSubmit}
                onToggleExpand={handleSearchToggle}
                initialSize={baseButtonHeight}
            />
        </nav>
        </div>
        <div className={styles.chatsContainer}>
        {chats.map((chat, index) => (
        <SideBarChatButton key={index} label={chat.title} />
        ))}
        </div>
        
    </aside>
  );
}

export default Sidebar;
