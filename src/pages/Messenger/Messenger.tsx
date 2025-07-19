import Chat from "../../components/Chat/Chat";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./Messenger.module.css";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

// Define the message interface here or import it from Chat
interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "system";
  isStreaming?: boolean;
  files?: { name: string; type: string; size: number }[];
}

function Messenger() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (chatId) {
      const fetchChatHistory = async () => {
        try {
          const response = await fetch(`/_api/chats/${chatId}`, { signal });
          if (response.ok) {
            const data = await response.json();
            setMessages(Array.isArray(data.messages) ? data.messages : []);
          } else {
            setMessages([]);
          }
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error("Fetch error in Messenger:", error);
            setMessages([]);
          }
        }
      };
      fetchChatHistory();
    } else {
      setMessages([]); // Clear messages if there's no chat ID
    }

    return () => {
      controller.abort();
    };
  }, [chatId]); // This effect re-runs when the chat ID changes

  return (
    <div className={styles.messenger}>
      <aside className={styles.sidebar}>
        {/* Pass the messages state to the Sidebar */}
        <Sidebar activeChatId={chatId} activeChatMessages={messages} />
      </aside>
      <div className={styles.chatContainer}>
        {/* Pass messages and the state setter to the Chat */}
        <Chat
          key={chatId ?? "default"}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
}

export default Messenger;
