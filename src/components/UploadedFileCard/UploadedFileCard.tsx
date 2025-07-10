import styles from "./UploadedFileCard.module.css";
import Text from "../Text/Text";
import { useState } from "react";

interface UploadedFileCardProps {
  fileName: string;
  fileType: string;
  fileSize: number;
}

function UploadedFileCard(props: Readonly<UploadedFileCardProps>) {
  const [showRawSize, setShowRawSize] = useState(false);

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
    <div className={styles.cardContainer}>
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
