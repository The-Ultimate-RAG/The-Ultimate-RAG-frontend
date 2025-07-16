import Text from "../Text/Text";
import styles from "./Message.module.css";
import React from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import UploadedFileCard from "../UploadedFileCard/UploadedFileCard";

interface MessageProps {
  key: number;
  textContent: string;
  sender: "user" | "system";
  openFileViewer?: (fileUrl: string, fileName: string) => void;
  isStreaming?: boolean;
  files?: { name: string; type: string; size: number }[];
}

function Message(props: Readonly<MessageProps>) {
  const { textContent, sender, openFileViewer, files } = props;
  const messageBubbleStyle: string = `${styles.messageBox} ${sender === "user" ? styles.userMessageBox : styles.systemMessageBox}`;
  const messageContainerStyle: string = `${styles.messageContainer} ${sender === "user" ? styles.userMessageContainer : styles.systemMessageContainer}`;

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.tagName === "A" && target.hasAttribute("href")) {
      event.preventDefault();
      const fileUrl = target.getAttribute("href");
      const fileName = target.textContent ?? "";
      if (fileUrl) {
        if (openFileViewer) {
          openFileViewer(fileUrl, fileName);
        }
      }
    }
  };

  const parsed = React.useMemo(() => {
    const html = marked.parse(textContent);
    return DOMPurify.sanitize(html);
  }, [textContent]);

  return (
    <div className={messageContainerStyle}>
      {files && files.length > 0 && (
        <div className={styles.attachedFiles}>
          {files.map((ffile, idx) => (
            <UploadedFileCard
              key={idx}
              fileName={ffile.name}
              fileType={ffile.type}
              fileSize={ffile.size}
              onClose={() => {}}
            />
          ))}
        </div>
      )}

      <div className={messageBubbleStyle} onClick={handleContentClick}>
        <Text interactable={true}>
          <span dangerouslySetInnerHTML={{ __html: parsed }} />
        </Text>
      </div>
    </div>
  );
}

export default Message;
