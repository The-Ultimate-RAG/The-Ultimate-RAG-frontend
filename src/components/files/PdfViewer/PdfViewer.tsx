import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { searchPlugin, SearchTargetPage } from "@react-pdf-viewer/search";

import "@react-pdf-viewer/search/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";

import styles from "./PdfViewer.module.css";

interface PdfViewerComponentProps {
  pdfUrl: string;
  initialPage?: number;
  textToHighlight?: string;
}

const PdfViewer = (props: PdfViewerComponentProps) => {
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const searchPluginInstance = searchPlugin();

  const { pdfUrl, textToHighlight, initialPage = 0 } = props;

  const handleSearch = () => {
    if (!textToHighlight || textToHighlight.trim() === "") {
      return;
    }

    searchPluginInstance.setTargetPages(
      (targetPage: SearchTargetPage) => targetPage.pageIndex === initialPage,
    );

    searchPluginInstance.highlight({
      keyword: textToHighlight,
      matchCase: false,
    });
  };

  return (
    <div className={styles.container}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          enableSmoothScroll={true}
          fileUrl={pdfUrl}
          plugins={[pageNavigationPluginInstance, searchPluginInstance]}
          defaultScale={SpecialZoomLevel.PageFit}
          initialPage={initialPage}
          onDocumentLoad={handleSearch}
        />
      </Worker>
    </div>
  );
};
export default PdfViewer;
