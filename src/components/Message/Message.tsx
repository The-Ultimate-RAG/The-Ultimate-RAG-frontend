import Text from "../Text/Text";
import styles from "./Message.module.css";
import React, { useState, useEffect, useRef } from "react"; // Import useState and useEffect
import { marked } from "marked";
import DOMPurify from "dompurify";
import UploadedFileCard from "../UploadedFileCard/UploadedFileCard";

interface MessageProps {
  key: number;
  textContent: string;
  sender: "user" | "system";
  openFileViewer?: (fileUrl: string, fileName: string, page: number) => void;
  isStreaming?: boolean;
  files?: { name: string; type: string; size: number }[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function transformCitationsToLinks(text: string): string {
  const citationRegex =
    /\s*\[Source:\s*([^,]+?)\s*,\s*Page:\s*(\d+)\s*,\s*Lines:\s*(\d+\s*-\s*\d+)\s*,\s*Start:?\s*(\d+)\]/g;
  return text.replace(citationRegex, (match, path, page, lines, start) => {
    const fileUrl = `http:\\\\127.0.0.1:5050\\viewer\\${path}`;
    const fileName = path;
    return ` <a id="${fileUrl}&${page}&${lines}&${start}" href="${fileUrl}" data-page="${page}">[Source]</a>`;
  });
}

function Message(props: Readonly<MessageProps>) {
  const { textContent, sender, openFileViewer, files, isStreaming } = props;
  const messageBubbleStyle: string = `${styles.messageBox} ${sender === "user" ? styles.userMessageBox : styles.systemMessageBox}`;
  const messageContainerStyle: string = `${styles.messageContainer} ${sender === "user" ? styles.userMessageContainer : styles.systemMessageContainer}`;

  const [sanitizedHtml, setSanitizedHtml] = useState("");

  useEffect(() => {
    const parseAndSanitize = async () => {
      const htmlResult = marked.parse(transformCitationsToLinks(textContent));
      let finalHtml: string;

      if (htmlResult instanceof Promise) {
        finalHtml = await htmlResult;
      } else {
        finalHtml = htmlResult;
      }
      setSanitizedHtml(DOMPurify.sanitize(finalHtml));
    };

    parseAndSanitize();
  }, [textContent]);

  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.tagName === "A" && target.hasAttribute("href")) {
      event.preventDefault();
      const fileUrl = target.getAttribute("href");
      const fileName = target.textContent ?? "";
      const page = target.getAttribute("data-page");
      console.log("File URL:", fileUrl, "Page:", page);
      if (fileUrl) {
        if (openFileViewer) {
          openFileViewer(fileUrl, fileName, parseInt(page));
        }
      }
    }
  };

  return (
    <div className={messageContainerStyle}>
      {files && files.length > 0 && (
        <div className={styles.attachedFiles}>
          {files.map((file, idx) => (
            <UploadedFileCard
              key={idx}
              fileName={file.name}
              fileType={file.type}
              fileSize={file.size}
              onClose={() => {}}
            />
          ))}
        </div>
      )}

      <div className={messageBubbleStyle} onClick={handleContentClick}>
        <Text
          as="div"
          interactable={true}
          colorVariant={sender === "user" ? "button" : "primary"}
        >
          <span
            className={styles.markdownContent}
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
          />
        </Text>
      </div>
    </div>
  );
}

export default Message;
