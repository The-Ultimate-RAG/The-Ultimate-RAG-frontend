import { marked } from 'marked';
import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

interface TxtPreviewProps {
  fileUrl: string;
}

const TxtViewer: React.FC<TxtPreviewProps> = (props) => {
    const { fileUrl } = props;
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHtml = async () => {
      try {
        const response = await fetch(`${fileUrl}`);
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
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default TxtViewer;