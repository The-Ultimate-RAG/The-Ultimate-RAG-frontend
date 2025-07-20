import React from "react";
import styles from "./FileViewerPopup.module.css";
import PdfViewer from "../PdfViewer/PdfViewer";
import Button from "../../buttons/MainButton/Button";
import Text from "../../Text/Text";
import TxtViewer from "../TxtViewer/TxtViewer";

interface FileViewerPopupProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string;
  fileName: string;
  initialPage?: number;
  initialLines?: string;
  start?: string;
}

const FileViewerPopup = ({
  isOpen,
  onClose,
  fileUrl,
  fileName,
  initialPage = 0,
  initialLines = "",
  start = "",
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
          {fileUrl.split(".").at(-1) === "pdf" ? <PdfViewer pdfUrl={fileUrl} initialPage={initialPage} /> : <TxtViewer fileUrl={fileUrl} initialPage={initialPage} initialLines={initialLines} start={start}/>}
        </div>
      </div>
    </>
  );
};

export default FileViewerPopup;
