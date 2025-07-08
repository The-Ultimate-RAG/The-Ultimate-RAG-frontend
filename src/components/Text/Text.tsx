import styles from "./Text.module.css";
import React from "react";

interface TextProps {
  textContent: React.ReactNode;
  fontWeight?: string | number;
  fontSize?: "small" | "medium" | "large" | "huge";
  colorVariant?: "default" | "primary" | "secondary" | "button" | "hover";
  interactable?: boolean;
}

function Text(props: Readonly<TextProps>) {
  const {
    textContent,
    fontSize = "medium",
    fontWeight = "normal",
    colorVariant = "default",
    interactable = false,
  } = props;

  const fontSizeClass = {
    small: styles.fontSizeSmall,
    medium: styles.fontSizeMedium,
    large: styles.fontSizeLarge,
    huge: styles.fontSizeHuge,
  }[fontSize];

  const colorClass = {
    default: "",
    primary: styles.colorPrimary,
    secondary: styles.colorSecondary,
    button: styles.colorButton,
    hover: styles.colorHover,
  }[colorVariant];

  const inlineStyles: React.CSSProperties = {
    fontWeight: fontWeight,
    userSelect: interactable ? "auto" : "none",
    WebkitUserSelect: interactable ? "auto" : "none",
    MozUserSelect: interactable ? "auto" : "none",
  };

  return (
    <p
      className={`${styles.text} ${colorClass} ${fontSizeClass}`}
      style={inlineStyles}
    >
      {textContent}
    </p>
  );
}

export default Text;
