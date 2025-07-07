import React, { useState } from "react";
import BaseInputField from "./BaseInputField";
import { EmailIcon } from "../../Icons/EmailIcon";

interface EmailInputFieldProps {
  label: string;
  width?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

function EmailInputField(props: Readonly<EmailInputFieldProps>) {
  const [emailValue, setEmailValue] = useState<string>("");

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setEmailValue(event.target.value);
  }

  const { width = "250px" } = props;

  return (
    <BaseInputField
      label={props.label}
      value={emailValue}
      type={"email"}
      icon={EmailIcon}
      onChange={handleEmailChange}
      width={width}
      inputRef={props.inputRef}
      onKeyDown={props.onKeyDown}
      autoComplete={"email"}
    />
  );
}

export default EmailInputField;
