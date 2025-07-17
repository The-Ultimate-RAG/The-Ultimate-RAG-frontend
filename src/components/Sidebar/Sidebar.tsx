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

interface ChatGroup {
  title: string;
  chats: ChatButton[];
}

interface SidebarProps {
  activeChatId?: string;
  activeChatMessages: any[];
}

function Sidebar(props: Readonly<SidebarProps>) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const navigate = useNavigate();
  const handleSearchToggle = (expanded: boolean) => {
    setIsSearchExpanded(expanded);
  };

  const [chats, setChats] = useState<ChatButton[]>([]);
  const baseButtonHeight = "40px";
  const [activeChatMessages, setActiveChatMessages] = useState<any[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      const response = await fetch("/_api/list_chats");
      if (!response.ok) {
        throw new Error(`Error, status: ${response.status}`);
      }
      const data = await response.json();
      if (data.chats) {
        const allChats: ChatButton[] = [];
        data.chats.forEach((group: ChatGroup) => {
          allChats.push(...group.chats);
        });
        setChats(allChats);
      }
    };

    fetchChats();
  }, []);

  const isAddChatBlocked =
    props.activeChatId &&
    activeChatMessages.length === 0 &&
    chats.find((chat) => chat.id === props.activeChatId)?.title === "new chat";

  const handleAddChat = async () => {
    if (isAddChatBlocked) {
      console.log(
        "Adding new chat is blocked because the current chat is empty.",
      );
      return;
    }

    const response = await fetch("/_api/new_chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "New chat" }),
    });

    if (!response.ok) {
      console.error(`New chat failed: ${response.status}`);
      return;
    }
    const newChat = await response.json(); // e.g., { id: '...', title: 'New chat' }

    setChats((prevChats) => [newChat, ...prevChats]);

    navigate(`/chats/${newChat.id}`);
  };

  const handleSearchSubmit = (query: string) => {
    console.log("Поисковый запрос:", query);
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
            isDisabled={isAddChatBlocked}
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
        {chats.map((chat) => (
          <SideBarChatButton
            key={chat.id}
            chatId={chat.id}
            title={chat.title}
            isActive={chat.id === props.activeChatId}
          />
        ))}
      </div>

      <div className={styles.themeSwitcher}>
        <ThemeSwitcher />
      </div>
    </aside>
  );
}

export default Sidebar;
