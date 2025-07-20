// UploadedFileCard.tsx
import styles from "./UploadedFileCard.module.css";
import Text from "../Text/Text";
import { useState, useEffect } from "react"; // Import useEffect

interface UploadedFileCardProps {
  fileName: string;
  fileType: string;
  fileSize: number;
  onClose: () => void;
  className?: string; // Add className prop
}

function UploadedFileCard(props: Readonly<UploadedFileCardProps>) {
  const [showRawSize, setShowRawSize] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // New state for animation trigger

  useEffect(() => {
    // Trigger animation after component mounts
    setIsMounted(true);
  }, []);

  const formatFileSize = (bytes: number) => {
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const iteration = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      parseFloat((bytes / Math.pow(k, iteration)).toFixed(2)) +
      " " +
      sizes[iteration]
    );
  };

  const handleSizeClick = () => {
    setShowRawSize((prevState) => !prevState);
  };

  return (
    <div
      className={`${styles.cardContainer} ${isMounted ? styles.enter : ""} ${props.className || ""}`}
    >
      <button className={styles.closeButton} onClick={props.onClose}>
        &times;
      </button>
      <Text
        fontWeight={"bold"}
        colorVariant={"primary"}
        fontSize={"large"}
        className={styles.fileName}
      >
        {props.fileName}.{props.fileType}
      </Text>
      <Text
        fontWeight={"regular"}
        colorVariant={"secondary"}
        fontSize={"small"}
        className={styles.fileTypeExpansion}
      >
        Portable document format
      </Text>
      <Text
        colorVariant={"primary"}
        onClick={handleSizeClick}
        interactable={true}
        fontSize={"medium"}
        className={styles.fileSize}
      >
        {showRawSize
          ? `${props.fileSize} Bytes`
          : formatFileSize(props.fileSize)}
      </Text>
    </div>
  );
}

export default UploadedFileCard;
