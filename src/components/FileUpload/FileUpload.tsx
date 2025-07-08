import { useState } from "react";
import { FileUploadIcon } from "../Icons/FileUploadIcon";
import Text from "../Text/Text";

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      /* Here should be some connection with the backend to send the file */
    }
  };

  return (
    <>
      <label htmlFor={"file-input"} style={{ cursor: "pointer" }}>
        <FileUploadIcon />
      </label>
      <input
        id={"file-input"}
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {selectedFile && (
        <div>
          <Text textContent={selectedFile.name} fontSize={"14px"} />
        </div>
      )}
    </>
  );
}

export default FileUpload;
