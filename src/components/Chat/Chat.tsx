import TextInput from "../InputField/Basic/TextInput/TextInput";
import styles from "./Chat.module.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Message from "../Message/Message";
import UploadedFileCard from "../UploadedFileCard/UploadedFileCard";
import FileViewerPopup from "../files/FileViewerPopup/FileViewerPopup";
import { useNavigate, useParams } from "react-router-dom";

interface ChatProps {
  width?: number;
  openFileViewer?: (fileUrl: string, fileName: string) => void;
}

interface ChatMessage {
  id: string;
  textContent: string;
  sender: "user" | "system";
  isStreaming?: boolean;
}

function Chat({ openFileViewer }: Readonly<ChatProps>) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentInput, setCurrentInput] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { chatId: chat_id } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isFileViewerOpen, setIsFileViewerOpen] = useState(false);
  const [viewerFileUrl, setViewerFileUrl] = useState("");
  const [viewerFileName, setViewerFileName] = useState("");

  useEffect(() => {
    if (!chat_id) {
      const createNewChat = async () => {
        try {
          const response = await fetch("/new_chat", { method: "POST" });
          if (response.ok) {
            const data = await response.json();
            navigate(`/chats/id=${data.chat_id}`, { replace: true });
          }
        } catch (error) {
          console.error("Failed to create a new chat:", error);
        }
      };
      createNewChat();
    }
  }, [chat_id, navigate]);

  useEffect(() => {
    console.log(`Fetching history for chatId: ${chat_id}`);
    if (chat_id) {
      const fetchChatHistory = async () => {
        try {
          const response = await fetch(`/chats/id=${chat_id}`);
          if (response.ok) {
            const data = await response.json();
            console.log(`Fetched messages for ${chat_id}:`, data.messages);
            setMessages(data.messages || []);
          } else {
            console.error(`Fetch failed with status: ${response.status}`);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      };
      fetchChatHistory();
    }
  }, [chat_id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const processStream = useCallback(
    async (response: Response, systemMessageId: string) => {
      const reader = response.body?.getReader();
      if (!reader) {
        return;
      }

      let accumulatedResponse = "";
      const decoder = new TextDecoder();
      const delay = 10;

      setMessages((prev) =>
        prev.map((message) =>
          message.id === systemMessageId
            ? { ...message, textContent: "", isStreaming: true }
            : message,
        ),
      );

      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        for (const element of buffer) {
          accumulatedResponse += element;

          setMessages((prev) =>
            prev.map((message) =>
              message.id === systemMessageId
                ? { ...message, textContent: accumulatedResponse }
                : message,
            ),
          );

          await new Promise((resolve) => setTimeout(resolve, delay));
        }

        buffer = "";

        if (done) {
          break;
        }
      }

      // --- Start of adapted part ---
      try {
        const replaceResponse = await fetch("/replace_message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: accumulatedResponse,
            chat_id: chat_id, // Use chat_id from useParams
          }),
        });

        if (!replaceResponse.ok) {
          throw new Error(`Replace error: ${replaceResponse.status}`);
        }

        const data = await replaceResponse.json(); // expects { "updated_message": "..." }

        // Update the message content with the potentially updated message from the backend
        setMessages((prev) =>
          prev.map((message) =>
            message.id === systemMessageId
              ? {
                  ...message,
                  textContent: data.updated_message, // Use the updated_message from the backend
                  isStreaming: false,
                }
              : message,
          ),
        );
      } catch (error) {
        console.error("Error replacing message:", error);
        // Optionally, update the message to reflect the error to the user
        setMessages((prev) =>
          prev.map((message) =>
            message.id === systemMessageId
              ? {
                  ...message,
                  textContent: `${accumulatedResponse} (Error processing response: ${error})`, // Append error to existing content
                  isStreaming: false,
                }
              : message,
          ),
        );
      }
      // --- End of adapted part ---
    },
    [chat_id],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(event.currentTarget.value);
  };

  const handleSendMessage = async () => {
    if (currentInput.trim() !== "" || uploadedFiles.length > 0) {
      const newUserMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        textContent: currentInput,
        sender: "user",
      };
      setMessages((previousMessages: ChatMessage[]) => [
        ...previousMessages,
        newUserMessage,
      ]);
      setCurrentInput("");

      const systemMessageId = `system-${Date.now()}`;
      const placeholderMessage: ChatMessage = {
        id: systemMessageId,
        textContent: "",
        sender: "system",
        isStreaming: true,
      };
      setMessages((prev: ChatMessage[]) => [...prev, placeholderMessage]);

      const formData = new FormData();
      formData.append("prompt", currentInput);
      if (chat_id) {
        formData.append("chat_id", chat_id);
      }
      uploadedFiles.forEach((file) => {
        formData.append("files", file);
      });
      setUploadedFiles([]);

      try {
        const response = await fetch("/message_with_docs", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          await processStream(response, systemMessageId);
        } else {
          const errorText = await response.text();
          console.error("Backend response not OK:", response.status, errorText);
          const errorMessage: ChatMessage = {
            id: systemMessageId,
            textContent: `Couldn't get a response. Error: ${response.status}`,
            sender: "system",
            isStreaming: false,
          };
          setMessages((prev) =>
            prev.map((message) =>
              message.id === systemMessageId ? errorMessage : message,
            ),
          );
        }
      } catch (error) {
        console.error("Failed to send message:", error);
        const errorMessage: ChatMessage = {
          id: systemMessageId,
          textContent: "An error occurred while sending your message.",
          sender: "system",
          isStreaming: false,
        };
        setMessages((prev) =>
          prev.map((message) =>
            message.id === systemMessageId ? errorMessage : message,
          ),
        );
      }
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

  const handleRemoveFile = (indexToRemove: number) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleOpenFileViewer = (fileUrl: string, fileName: string) => {
    setViewerFileUrl(fileUrl);
    setViewerFileName(fileName);
    setIsFileViewerOpen(true);
  };

  const handleCloseFileViewer = () => {
    setIsFileViewerOpen(false);
    setViewerFileUrl("");
    setViewerFileName("");
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messageDisplay}>
        {messages.map((message) => (
          <Message
            key={message.id}
            textContent={message.textContent}
            sender={message.sender}
            openFileViewer={handleOpenFileViewer}
            isStreaming={message.isStreaming}
          />
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputArea}>
        {uploadedFiles.length > 0 && (
          <div className={styles.uploadedFilesContainer}>
            {" "}
            {uploadedFiles.map((file, index) => (
              <UploadedFileCard
                key={index}
                fileName={file.name.split(".").slice(0, -1).join(".")}
                fileType={file.name.split(".").pop() ?? ""}
                fileSize={file.size}
                onClose={() => handleRemoveFile(index)}
                className={styles.uploadedFileCardEnter}
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

      <FileViewerPopup
        isOpen={isFileViewerOpen}
        onClose={handleCloseFileViewer}
        fileUrl={viewerFileUrl}
        fileName={viewerFileName}
      />
    </div>
  );
}

export default Chat;
