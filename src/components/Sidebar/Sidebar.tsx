// Sidebar.tsx
import SideBarChatButton from "../buttons/SideBarChatButton/SideBarChatButton";
import React, { useCallback, useEffect, useState } from "react";
import Button from "../buttons/MainButton/Button";
import styles from "./SideBar.module.css";
import SearchButton from "../buttons/SearchButton/SearchButton";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import { useNavigate } from "react-router-dom";
import { Chat } from "../Icons/Chat";
import Text from "../Text/Text";

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

  const isAddChatBlocked =
    props.activeChatId &&
    props.activeChatMessages.length === 0 &&
    chats.find((chat) => chat.id === props.activeChatId)?.title === "new chat";

  const loadChats = useCallback(async () => {
    try {
      const res = await fetch("/_api/list_chats");
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      const flat: ChatButton[] = [];
      data.chats?.forEach((g: ChatGroup) => flat.push(...g.chats));
      setChats(flat);
    } catch (e) {
      console.error("Failed to load chats", e);
    }
  }, []);

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  const handleAddChat = async () => {
    if (isAddChatBlocked) return;

    const res = await fetch("/_api/new_chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "New chat" }),
    });

    if (!res.ok) {
      console.error("new_chat failed", res.status);
      return;
    }

    await loadChats();

    const newChat = await res.json();
    navigate(`/chats/${newChat.id}`);
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
            onToggleExpand={handleSearchToggle}
            initialSize={baseButtonHeight}
          />
        </nav>
      </div>
      <div className={styles.chatsContainer}>
        {chats.length === 0 ? (
          <div className={styles.noChatsPlaceholder}>
            <p className={styles.noChatsIcon}>
              <Chat />
            </p>
            <Text
              className={styles.noChatsTitle}
              fontSize={"huge"}
              fontWeight={"bold"}
            >
              No chats yet
            </Text>
            <Text
              className={styles.noChatsDescriptionLine}
              fontWeight={"regular"}
            >
              Click to “+ Add new chat”
            </Text>
            <Text
              className={styles.noChatsDescriptionLine}
              fontWeight={"regular"}
            >
              to add a conversation
            </Text>

            <hr className={styles.horizontalLine} />
            <SideBarChatButton
              title={"No recent conversations"}
              chatId={"none"}
              isActive={true}
              className={styles.noRecentConversations}
            />
          </div>
        ) : (
          chats.map((chat) => (
            <SideBarChatButton
              key={chat.id}
              chatId={chat.id}
              title={chat.title}
              isActive={chat.id === props.activeChatId}
            />
          ))
        )}
      </div>

      <div className={styles.themeSwitcher}>
        <ThemeSwitcher />
      </div>
    </aside>
  );
}

export default Sidebar;
