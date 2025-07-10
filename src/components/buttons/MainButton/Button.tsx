import styles from "./Button.module.css";
import Text from "../../Text/Text";
import React from "react";

interface ButtonProps {
  text: string;
  width?: string;
  fontSize?: "small" | "medium" | "large";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonRef?: React.Ref<HTMLButtonElement>;
  height?: string;
  borderRadius?: "default" | "round";
}

function Button(props: Readonly<ButtonProps>) {
  const {
    text,
    width = "100px",
    fontSize = "large",
    buttonRef,
    onClick,
    height,
  } = props;

  const inlineStyles: React.CSSProperties = {
    width: width,
    height: height,
  };

  return (
    <button
      className={styles.button}
      style={inlineStyles}
      ref={buttonRef}
      onClick={onClick}
    >
      <Text interactable={false} fontWeight={"bold"} fontSize={fontSize}>
        {text}
      </Text>
    </button>
  );
}

export default Button;
