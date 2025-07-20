import Text from "../../components/Text/Text";
import styles from "./FormPage.module.css";
import Button from "../../components/buttons/MainButton/Button";
import PasswordInputField from "../../components/InputField/Auth/PasswordInputField";
import EmailInputField from "../../components/InputField/Auth/EmailInputField";
import Checkbox from "../../components/Checkbox/Checkbox";
import React, { useEffect } from "react";

function RegisterPage() {
  const width: string = "300px";
  const fontSize: string = "14px";

  const emailInputRef = React.createRef<HTMLInputElement>();
  const passwordInputRef = React.createRef<HTMLInputElement>();
  const repeatPasswordInputRef = React.createRef<HTMLInputElement>();
  const loginButtonRef = React.createRef<HTMLButtonElement>();

  useEffect(() => {
    emailInputRef.current?.focus();

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement instanceof HTMLElement) {
          activeElement.blur();
        }
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const handleEmailKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "ArrowDown") {
      event.preventDefault();
      passwordInputRef.current?.focus();
    }
  };

  const handlePasswordKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      repeatPasswordInputRef.current?.focus();
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      emailInputRef.current?.focus();
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      repeatPasswordInputRef.current?.focus();
    }
  };

  const handleRepeatPasswordKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      loginButtonRef.current?.focus();
      loginButtonRef.current?.click();
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      passwordInputRef.current?.focus();
    }
  };

  const handleLoginClick = () => {};

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerContainer}>
        <Text fontWeight={"bold"} fontSize={"huge"} colorVariant={"primary"}>
          Sign Up
        </Text>
      </div>
      <EmailInputField
        label={"Email"}
        width={width}
        inputRef={emailInputRef}
        onKeyDown={handleEmailKeyDown}
      />
      <PasswordInputField
        label={"Password"}
        width={width}
        inputRef={passwordInputRef}
        onKeyDown={handlePasswordKeyDown}
      />
      <PasswordInputField
        label={"Repeat your password"}
        width={width}
        inputRef={repeatPasswordInputRef}
        onKeyDown={handleRepeatPasswordKeyDown}
      />
      <div className={styles.componentRow}>
        <Checkbox
          label={
            <>
              {"I agree with "}
              <a href="/register">terms and conditions</a>
            </>
          }
          size={fontSize}
        />
      </div>
      <div className={styles.loginAndRegisterContainer}>
        <Button
          children={"Register"}
          width={width}
          fontSize={"large"}
          buttonRef={loginButtonRef}
          onClick={handleLoginClick}
        />
        <Text fontSize={"small"} interactable={true} colorVariant={"primary"}>
          Already have an account? <a href="/login">Log in</a>
        </Text>
      </div>
    </div>
  );
}

export default RegisterPage;
