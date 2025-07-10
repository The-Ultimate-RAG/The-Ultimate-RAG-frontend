import React from "react";
import styles from "./FileViewerPopup.module.css";
import PdfViewer from "../PdfViewer/PdfViewer";
import Button from "../../buttons/MainButton/Button";
import Text from "../../Text/Text";

interface FileViewerPopupProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
  fileName: string;
}

const FileViewerPopup = ({
  isOpen,
  onClose,
  fileUrl,
  fileName,
}: FileViewerPopupProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={`${styles.popupContainer} ${isOpen ? styles.open : ""}`}>
        <header className={styles.popupHeader}>
          <Text className={styles.fileName} fontWeight={"bold"}>
            {fileName}
          </Text>
          <Button onClick={onClose} width="80px" height="40px">
            Close
          </Button>
        </header>
        <div className={styles.viewerWrapper}>
          {fileUrl ? <PdfViewer pdfUrl={fileUrl} /> : <p>No file selected.</p>}
        </div>
      </div>
    </>
  );
};

export default FileViewerPopup;
