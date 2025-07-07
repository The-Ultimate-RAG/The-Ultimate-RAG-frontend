import TextInput from "../InputField/Basic/TextInput/TextInput";
import styles from "./Chat.module.css";
import React, { useEffect, useRef, useState } from "react";
import Message from "../Message/Message";

interface ChatProps {
  width?: number;
}

interface ChatMessage {
  textContent: string;
  sender: "user" | "system";
}

function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentInput, setCurrentInput] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(event.currentTarget.value);
  };

  const handleSendMessage = () => {
    if (currentInput.trim() != "") {
      const newUserMessage: ChatMessage = {
        textContent: currentInput,
        sender: "user",
      };

      setMessages((previousMessages: ChatMessage[]) => [
        ...previousMessages,
        newUserMessage,
      ]);

      setCurrentInput("");

      setTimeout(() => {
        const systemResponse: ChatMessage = {
          textContent: `Echo: ${newUserMessage.textContent}`,
          sender: "system",
        };

        setMessages((previousMessages: ChatMessage[]) => [
          ...previousMessages,
          systemResponse,
        ]);
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messageDisplay}>
        {messages.map((message, index) => (
          <Message
            key={index}
            textContent={message.textContent}
            sender={message.sender}
          />
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputArea}>
        <TextInput
          label={"Enter your question"}
          value={currentInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default Chat;
