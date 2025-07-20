import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import styles from "./TxtViewer.module.css";

interface TxtPreviewProps {
  fileUrl: string;
  initialPage?: number;
  initialLines?: string;
  start?: string;
}

const TxtViewer: React.FC<TxtPreviewProps> = (props) => {
  const { fileUrl, initialPage, initialLines, start } = props;
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHtml = async () => {
      try {
        const url = new URL(fileUrl);
        if (initialPage !== undefined) {
          url.searchParams.append("page", initialPage.toString());
        }
        if (initialLines !== undefined) {
          url.searchParams.append("lines", initialLines);
        }
        if (start !== undefined) {
          url.searchParams.append("start", start);
        }

        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = DOMPurify.sanitize(await response.text());
        setHtmlContent(html);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHtml();
  }, []);

  if (loading) {
    return <div>Loading HTML...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className={styles.textContainer}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default TxtViewer;
