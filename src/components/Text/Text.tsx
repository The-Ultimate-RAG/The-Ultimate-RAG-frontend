import styles from "./Text.module.css";
import React from "react";

interface TextProps {
  textContent: React.ReactNode;
  fontWeight?: string | number;
  fontSize?: string | number;
  colorVariant?: "default" | "primary" | "secondary" | "button" | "hover";
  interactable?: boolean;
}

function Text(props: Readonly<TextProps>) {
  const {
    textContent,
    fontSize = "16px",
    fontWeight = "normal",
    colorVariant = "default",
    interactable = false,
  } = props;

  const colorClass = {
    default: "",
    primary: styles.colorPrimary,
    secondary: styles.colorSecondary,
    button: styles.colorButton,
    hover: styles.colorHover,
  }[colorVariant];

  const inlineStyles: React.CSSProperties = {
    fontSize: fontSize,
    fontWeight: fontWeight,
    userSelect: interactable ? "auto" : "none",
    WebkitUserSelect: interactable ? "auto" : "none",
    MozUserSelect: interactable ? "auto" : "none",
  };

  return (
    <p className={`${styles.text} ${colorClass}`} style={inlineStyles}>
      {textContent}
    </p>
  );
}

export default Text;
