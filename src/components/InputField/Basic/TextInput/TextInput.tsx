import styles from "./TextInput.module.css";
import React from "react";
import { FileUploadIcon } from "../../../Icons/FileUploadIcon";

interface InputFieldProps {
  label: string;
  value: string;
  width?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onIconMouseDown?: (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  inputRef?: React.Ref<HTMLInputElement>;
  fileUpload?: boolean;
  onFileChange?: (files: File[] | null) => void;
}

function PromptInput(props: Readonly<InputFieldProps>) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      props.onFileChange?.(Array.from(event.target.files));
    } else {
      props.onFileChange?.(null);
    }
  };

  return (
    <div className={styles.backgroundContainer}>
      <input
        className={styles.input}
        type={"text"}
        placeholder={props.label}
        autoComplete={"off"}
        value={props.value}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
      />
      {
        <>
          <input
            id={"file-input"}
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className={styles.hiddenFileInput}
            multiple={true}
          />
          <div className={styles.iconContainer} onClick={handleIconClick}>
            <FileUploadIcon />
          </div>
        </>
      }
    </div>
  );
}

export default PromptInput;
