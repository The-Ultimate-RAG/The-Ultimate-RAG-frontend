// PasswordInputField.tsx
import React, { useState, useImperativeHandle } from "react";
import BaseInputField from "./BaseInputField";
import PasswordVisibilityIcon from "../../Icons/passwordEyeIcon/PasswordVisibilityIcon";

interface PasswordInputFieldProps {
  label: string;
  width?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

export interface PasswordInputFieldRef {
  togglePasswordVisibility: () => void;
}

function PasswordInputField(
  props: Readonly<PasswordInputFieldProps>,
  ref: React.Ref<PasswordInputFieldRef>,
) {
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const { width = "250px" } = props;

  function handlePasswordChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    setPasswordValue(event.target.value);
  }

  const togglePasswordVisibility = React.useCallback((): void => {
    setIsPasswordVisible((prevState: boolean) => !prevState);
  }, []);

  function handleIconMouseDown(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void {
    event.preventDefault();
    togglePasswordVisibility();
  }

  useImperativeHandle(ref, () => ({
    togglePasswordVisibility,
  }));

  const inputType = isPasswordVisible ? "text" : "password";

  return (
    <BaseInputField
      label={props.label}
      value={passwordValue}
      type={inputType}
      onChange={handlePasswordChange}
      width={width}
      inputRef={props.inputRef}
      onKeyDown={props.onKeyDown}
      autoComplete={"password"}
    >
      <PasswordVisibilityIcon
        isVisible={isPasswordVisible}
        onMouseDown={handleIconMouseDown}
      />
    </BaseInputField>
  );
}

export default React.forwardRef(PasswordInputField);
