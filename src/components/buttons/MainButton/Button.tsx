import styles from "./Button.module.css";
import Text from "../../Text/Text";
import React from "react";

interface ButtonProps {
  children: string;
  width?: string;
  fontSize?: "small" | "medium" | "large";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonRef?: React.Ref<HTMLButtonElement>;
  height?: string;
  borderRadius?: "default" | "round";
  className?: string;
  isDisabled?: boolean | "";
}

function Button(props: Readonly<ButtonProps>) {
  const {
    children,
    width = "100px",
    fontSize = "large",
    buttonRef,
    onClick,
    height,
    borderRadius = "default",
    isDisabled = false,
  } = props;

  const inlineStyles: React.CSSProperties = {
    width: width,
    height: height,
    borderRadius: borderRadius === "default" ? "10px" : "2em",
  };

  return (
    <button
      className={`${styles.button} ${props.className}`}
      style={inlineStyles}
      ref={buttonRef}
      onClick={onClick}
    >
      <Text interactable={false} fontWeight={"bold"} fontSize={fontSize}>
        {children}
      </Text>
    </button>
  );
}

export default Button;
