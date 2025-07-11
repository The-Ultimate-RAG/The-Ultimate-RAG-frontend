import SideBarChatButton from "../buttons/SideBarChatButton/SideBarChatButton";
import React, { useEffect, useState } from "react";
import Button from "../buttons/MainButton/Button";
import styles from "./SideBar.module.css";
import SearchButton from "../buttons/SearchButton/SearchButton";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import { useNavigate } from "react-router-dom";

interface ChatButton {
  title: string;
}

interface ChatGroup {
  title: string;
  chats: ChatButton[];
}

function Sidebar() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const handleSearchToggle = (expanded: boolean) => {
    setIsSearchExpanded(expanded);
  };
  const [chatGroups, setChatGroups] = useState<ChatGroup[]>([]);
  const [chats, setChats] = useState<ChatButton[]>([]);
  const navigate = useNavigate();
  const baseButtonHeight = "40px"; // Базовая высота кнопки

  useEffect(() => {
    const fetchChatGroups = async () => {
      const response = await fetch("/api/user_chats");
      if (response.ok) {
        const data = await response.json();
        setChatGroups(data);
      } else {
        console.error("Failed to fetch chats groups");
      }
    };

    fetchChatGroups();
  }, []);

  const refetchChats = async () => {
    const response = await fetch("/api/user_chats");
    if (response.ok) {
      const data = await response.json();
      setChatGroups(data);
    }
  };

  const handleAddChat = async () => {
    const response = await fetch("/new_chat", { method: "POST" });
    if (response.ok) {
      const data = await response.json();
      navigate(`/chats/${data.chat_id}`);
      refetchChats();
    }
  };

  const handleSearchSubmit = (query: string) => {
    console.log("Поисковый запрос:", query);
    // Добавьте здесь вашу логику поиска
  };

  return (
    <aside className={styles.sidebarContainer}>
      <div className={styles.buttonContainer}>
        <div
          className={
            isSearchExpanded ? styles.hideNeighbor : styles.addChatButton
          }
        >
          <Button
            children={"+ Add chat"}
            height={baseButtonHeight}
            width="100%"
            borderRadius="round"
            onClick={handleAddChat}
          />
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

      <div className={styles.themeSwitcher}>
        <ThemeSwitcher />
      </div>
    </aside>
  );
}

export default Sidebar;
