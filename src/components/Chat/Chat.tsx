// Chat.tsx
import TextInput from "../InputField/Basic/TextInput/TextInput";
import styles from "./Chat.module.css";
import React, { useEffect, useRef, useState } from "react";
import Message from "../Message/Message";
import UploadedFileCard from "../UploadedFileCard/UploadedFileCard";
import FileViewerPopup from "../files/FileViewerPopup/FileViewerPopup"; // Import FileViewerPopup

interface ChatProps {
  width?: number;
  openFileViewer: (fileUrl: string, fileName: string) => void;
}

interface ChatMessage {
  textContent: string;
  sender: "user" | "system";
}

function Chat({ openFileViewer }: Readonly<ChatProps>) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentInput, setCurrentInput] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // State for FileViewerPopup
  const [isFileViewerOpen, setIsFileViewerOpen] = useState(false);
  const [viewerFileUrl, setViewerFileUrl] = useState("");
  const [viewerFileName, setViewerFileName] = useState("");

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
    if (currentInput.trim() !== "" || uploadedFiles.length > 0) {
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
          textContent: `Here is some information related to: "${newUserMessage.textContent}." You can also view the <a href="/COMP_ARCH.pdf">Full Document.pdf</a> or the <a href="/ZagirLatypovResume.pdf">Read Me.txt</a>.`,
          sender: "system",
        };

        setMessages((previousMessages: ChatMessage[]) => [
          ...previousMessages,
          systemResponse,
        ]);
      }, 500);
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
        {messages.map((message, index) => (
          <Message
            key={index}
            textContent={message.textContent}
            sender={message.sender}
            openFileViewer={handleOpenFileViewer} // Pass the handler down
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
