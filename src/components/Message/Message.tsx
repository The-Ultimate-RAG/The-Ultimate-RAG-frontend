import Text from "../Text/Text";
import styles from "./Message.module.css";
import React from "react";

interface MessageProps {
  key: number;
  textContent: string;
  sender: "user" | "system";
  openFileViewer?: (fileUrl: string, fileName: string) => void;
}

function Message(props: Readonly<MessageProps>) {
  const { textContent, sender, openFileViewer } = props;

  const messageStyle: string = `${styles.messageBox} ${sender === "user" ? styles.userMessageBox : styles.systemMessageBox}`;

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.tagName === "A" && target.hasAttribute("href")) {
      event.preventDefault(); // Prevent default navigation
      const fileUrl = target.getAttribute("href");
      const fileName = target.textContent || ""; // Get the text content for the file name
      if (fileUrl) {
        if (openFileViewer) {
          openFileViewer(fileUrl, fileName);
        }
      }
    }
  };

  return (
    <div className={messageStyle} onClick={handleContentClick}>
      <Text interactable={true}>
        <span dangerouslySetInnerHTML={{ __html: textContent }} />
      </Text>
    </div>
  );
}

export default Message;
