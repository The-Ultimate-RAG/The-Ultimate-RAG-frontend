import TextInput from "../InputField/Basic/TextInput/TextInput";
import styles from "./Chat.module.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Message from "../Message/Message";
import UploadedFileCard from "../UploadedFileCard/UploadedFileCard";
import FileViewerPopup from "../files/FileViewerPopup/FileViewerPopup";
import { useParams } from "react-router-dom";

import Text from "../Text/Text";

interface ChatProps {
  width?: number;
  openFileViewer?: (fileUrl: string, fileName: string) => void;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "system";
  isStreaming?: boolean;
  files?: { name: string; type: string; size: number }[];
}

function Chat({ messages, setMessages }: Readonly<ChatProps>) {
  const [currentInput, setCurrentInput] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { chatId: chat_id } = useParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isFileViewerOpen, setIsFileViewerOpen] = useState(false);
  const [viewerFileUrl, setViewerFileUrl] = useState("");
  const [viewerFileName, setViewerFileName] = useState("");
  const [initialPage, setInitialPage] = useState(1);
  const [initialLines, setInitialLines] = useState("");
  const [start, setStart] = useState("");
  const [error, setError] = useState<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 0);

    return () => clearTimeout(timer);
  }, [messages.length]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const processStream = useCallback(
    async (response: Response, systemMessageId: string) => {
      const reader = response.body?.getReader();
      if (!reader) {
        return;
      }

      let accumulatedResponse = "";
      const decoder = new TextDecoder();
      const delay = 3;

      setMessages((prev) =>
        prev.map((message) =>
          message.id === systemMessageId
            ? { ...message, content: "", isStreaming: true }
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
                ? { ...message, content: accumulatedResponse }
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

      setMessages((prev) =>
        prev.map((message) =>
          message.id === systemMessageId
            ? {
                ...message,
                content: accumulatedResponse,
                isStreaming: false,
              }
            : message,
        ),
      );

      try {
        const response = await fetch("/_api/replace_message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: accumulatedResponse,
            chatId: chat_id,
          }),
        });

        if (!response.ok) {
          console.error(
            "Failed to persist assistant message. Status:",
            response.status,
          );
        }
      } catch (error) {
        console.error("Error persisting assistant message:", error);
      }
    },
    [chat_id, setMessages],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(event.currentTarget.value);
  };

  const handleSendMessage = async () => {
    if (messages.length === 0 && uploadedFiles.length === 0) {
      setError("A file attachment is required to start a new chat.");
      return;
    }

    if (currentInput.trim() !== "" || uploadedFiles.length > 0) {
      setError(null);
      const newUserMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        content: currentInput,
        sender: "user",
        files: uploadedFiles.map((file) => ({
          name: file.name.split(".").slice(0, -1).join("."),
          type: file.name.split(".").pop() ?? "",
          size: file.size,
        })),
      };
      setMessages((previousMessages: ChatMessage[]) => [
        ...previousMessages,
        newUserMessage,
      ]);
      setUploadedFiles([]);
      setCurrentInput("");

      const systemMessageId = `system-${Date.now()}`;
      const placeholderMessage: ChatMessage = {
        id: systemMessageId,
        content: "",
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
        const response = await fetch("/_api/message_with_docs", {
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
            content: `Couldn't get a response. Error: ${response.status}`,
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
          content: "An error occurred while sending your message.",
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

  const handleOpenFileViewer = (
    fileUrl: string,
    fileName: string,
    page: number, lines: string, start: string,
  ) => {
    setViewerFileUrl(fileUrl);
    setViewerFileName(fileName);
    setInitialPage(page);
    setIsFileViewerOpen(true);
    setInitialLines(lines);
    setStart(start);
  };

  const handleCloseFileViewer = () => {
    setIsFileViewerOpen(false);
    setViewerFileUrl("");
    setViewerFileName("");
  };

  const handleCloseError = () => {
    setError(null);
  };

  const inputLabel =
    messages.length === 0
      ? "Please upload a document to start the chat"
      : "Enter your question";

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messageDisplay}>
        {messages.map((message) => (
          <Message
            key={message.id}
            textContent={message.content}
            sender={message.sender}
            openFileViewer={handleOpenFileViewer}
            isStreaming={message.isStreaming}
            files={message.files}
          />
        ))}

        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputArea}>
        {error && (
          <div className={styles.errorPopup}>
            <Text className={styles.errorMessage}>{error}</Text>
            <button onClick={handleCloseError} className={styles.closeButton}>
              &times;
            </button>
          </div>
        )}

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
          label={inputLabel}
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          onFileChange={handleFileChange}
        />
      </div>

      <FileViewerPopup
        isOpen={isFileViewerOpen}
        onClose={handleCloseFileViewer}
        fileUrl={viewerFileUrl}
        fileName={viewerFileName}
        initialPage={initialPage}
        initialLines={initialLines}
        start={start}
      />
    </div>
  );
}

export default Chat;
