import Text from "../Text/Text";
import styles from "./Message.module.css";
import React from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

interface MessageProps {
  key: number;
  textContent: string;
  sender: "user" | "system";
  openFileViewer?: (fileUrl: string, fileName: string) => void;
  isStreaming?: boolean;
}

function Message(props: Readonly<MessageProps>) {
  const { textContent, sender, openFileViewer } = props;

  const messageStyle: string = `${styles.messageBox} ${sender === "user" ? styles.userMessageBox : styles.systemMessageBox}`;

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.tagName === "A" && target.hasAttribute("href")) {
      event.preventDefault();
      const fileUrl = target.getAttribute("href");
      const fileName = target.textContent || "";
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
    <div className={messageStyle} onClick={handleContentClick}>
      <Text interactable={true}>
        <span dangerouslySetInnerHTML={{ __html: parsed }} />
      </Text>
    </div>
  );
}

export default Message;
