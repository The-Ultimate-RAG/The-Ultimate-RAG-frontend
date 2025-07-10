import Text from "../../components/Text/Text";
import styles from "./FormPage.module.css";
import Button from "../../components/buttons/MainButton/Button";
import PasswordInputField from "../../components/InputField/Auth/PasswordInputField";
import EmailInputField from "../../components/InputField/Auth/EmailInputField";
import Checkbox from "../../components/Checkbox/Checkbox";
import React, { useEffect } from "react";

function LoginPage() {
  const width: string = "300px";
  const fontSize: string = "14px";

  const emailInputRef = React.createRef<HTMLInputElement>();
  const passwordInputRef = React.createRef<HTMLInputElement>();
  const loginButtonRef = React.createRef<HTMLButtonElement>();

  useEffect(() => {
    emailInputRef.current?.focus();
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

      loginButtonRef.current?.focus();
      loginButtonRef.current?.click();
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      emailInputRef.current?.focus();
    }
  };

  const handleLoginClick = () => {};

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerContainer}>
        <Text fontWeight={"bold"} fontSize={"huge"} colorVariant={"primary"}>
          Log In
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
      <div className={styles.componentRow}>
        <Checkbox label={"Remember me"} size={fontSize} />
        <Text fontSize={"medium"}>
          <a href={"/"}>Forgot password?</a>
        </Text>
      </div>
      <div className={styles.loginAndRegisterContainer}>
        <Button
          text={"Login"}
          width={width}
          fontSize={"large"}
          buttonRef={loginButtonRef}
          onClick={handleLoginClick}
        />
        <Text fontSize={"small"} interactable={true} colorVariant={"primary"}>
          Don't have an account? <a href="/register">Register</a>
        </Text>
      </div>
    </div>
  );
}

export default LoginPage;
