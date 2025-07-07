import React, { useState } from "react";
import styles from "./InputField.module.css";

interface InputFieldProps {
  label: string;
  value: string;
  width?: string;
  type?: string;
  icon?: React.ComponentType<any>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onIconMouseDown?: (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  inputRef?: React.Ref<HTMLInputElement>;
  autoComplete?: string;
}

function BaseInputField(props: Readonly<InputFieldProps>) {
  const {
    label,
    value,
    width = "325px",
    type = "text",
    icon: IconComponent,
    onIconMouseDown,
    onChange,
    onFocus,
    onBlur,
    children,
    inputRef,
    onKeyDown,
    autoComplete,
  } = props;

  const inlineStyles: React.CSSProperties = {
    width: width,
  };

  const [isInternalFocused, setIsInternalFocused] = useState<boolean>(false);

  function handleFocus(event: React.FocusEvent<HTMLInputElement>): void {
    setIsInternalFocused(true);
    if (onFocus) {
      onFocus(event);
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>): void {
    setIsInternalFocused(false);
    if (onBlur) {
      onBlur(event);
    }
  }

  const shouldFloat = isInternalFocused || value !== "";

  return (
    <div className={styles.inputContainer} style={inlineStyles}>
      <input
        type={type}
        className={styles.inputField}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputRef}
        onKeyDown={onKeyDown}
        autoComplete={autoComplete}
      />

      <label
        className={`${styles.inputLabel} ${shouldFloat ? styles.inputLabelFloating : ""}`}
      >
        {label}
      </label>

      {children ? (
        <div
          className={`${styles.inputFieldIcon} ${shouldFloat ? styles.inputFieldIconFloating : ""}`}
        >
          {children}
        </div>
      ) : (
        IconComponent && (
          <IconComponent
            className={`${styles.inputFieldIcon} ${shouldFloat ? styles.inputFieldIconFloating : ""}`}
            onMouseDown={onIconMouseDown}
          />
        )
      )}
    </div>
  );
}

export default BaseInputField;
