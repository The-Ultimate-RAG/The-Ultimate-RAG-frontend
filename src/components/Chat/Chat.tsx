import TextInput from "../InputField/Basic/TextInput/TextInput";
import styles from "./Chat.module.css";
import React, { useEffect, useRef, useState } from "react";
import Message from "../Message/Message";
import UploadedFileCard from "../UploadedFileCard/UploadedFileCard";

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
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
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
    if (currentInput.trim() != "" || uploadedFiles.length > 0) {
      const newUserMessage: ChatMessage = {
        textContent: currentInput,
        sender: "user",
      };

      setMessages((previousMessages: ChatMessage[]) => [
        ...previousMessages,
        newUserMessage,
      ]);

      setCurrentInput("");
      setUploadedFiles([]);

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

  const handleFileChange = (files: File[] | null) => {
    if (files && files.length > 0) {
      setUploadedFiles((prevFiles) => {
        const existingFileNames = new Set(prevFiles.map((file) => file.name));
        const newUniqueFiles = files.filter(
          (file) => !existingFileNames.has(file.name),
        );
        return [...prevFiles, ...newUniqueFiles];
      });
    } else if (files === null) {
      setUploadedFiles([]);
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
        {uploadedFiles.length > 0 && ( //
          <div className={styles.uploadedFilesContainer}>
            {" "}
            {uploadedFiles.map((file, index) => (
              <UploadedFileCard
                key={index}
                fileName={file.name.split(".").slice(0, -1).join(".")}
                fileType={file.name.split(".").pop() ?? ""}
                fileSize={file.size}
              />
            ))}
          </div>
        )}
        <TextInput
          label={"Enter your question"}
          value={currentInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFileChange={handleFileChange}
        />
      </div>
    </div>
  );
}

export default Chat;
