import SideBarChatButton from "../buttons/SideBarChatButton/SideBarChatButton";
import React, { useEffect, useState } from "react";
import Button from "../buttons/MainButton/Button";
import styles from "./SideBar.module.css";
import SearchButton from "../buttons/SearchButton/SearchButton";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import { useNavigate } from "react-router-dom";

interface ChatButton {
  id: string;
  title: string;
}

function Sidebar() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const navigate = useNavigate();
  const handleSearchToggle = (expanded: boolean) => {
    setIsSearchExpanded(expanded);
  };

  const [chats, setChats] = useState<ChatButton[]>([]);
  const baseButtonHeight = "40px";

  useEffect(() => {
    const fetchChats = async () => {
      const response = await fetch("/list_chats");
      if (!response.ok) {
        throw new Error(`Error, status: ${response.status}`);
      }
      const data = await response.json();
      if (data.chats) {
        setChats(data.chats);
      }
    };

    fetchChats();
  }, []);

  const handleAddChat = async () => {
    const response = await fetch("/new_chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "New chat" }),
    });

    if (!response.ok) {
      console.error(`New chat failed: ${response.status}`);
      return;
    }
    const data = await response.json();
    navigate(`/chats/id=${data.chat_id}`);

    const fetchChats = async () => {
      const res = await fetch("/list_chats");
      if (res.ok) {
        const chatData = await res.json();
        console.log("Updated chats:", chatData.chats);
        setChats(chatData.chats || []);
      }
    };
    fetchChats();
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
            height={baseButtonHeight}
            width="100%"
            borderRadius="round"
            onClick={handleAddChat}
          >
            + Add chat
          </Button>
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
          <SideBarChatButton key={index} chatId={chat.id} title={chat.title} />
        ))}
      </div>

      <div className={styles.themeSwitcher}>
        <ThemeSwitcher />
      </div>
    </aside>
  );
}

export default Sidebar;
