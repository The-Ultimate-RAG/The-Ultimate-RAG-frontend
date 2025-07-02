import styles from "./Text.module.css";
import React from "react";

interface TextProps {
  textContent: React.ReactNode;
  fontWeight?: string | number;
  fontSize?: string | number;
  color?: string;
  interactable?: boolean;
}

function Text(props: Readonly<TextProps>) {
  const {
    textContent,
    fontSize = "16px",
    fontWeight = "normal",
    color,
    interactable = false,
  } = props;

  const inlineStyles: React.CSSProperties = {
    color: color,
    fontSize: fontSize,
    fontWeight: fontWeight,
    userSelect: interactable ? "auto" : "none",
    WebkitUserSelect: interactable ? "auto" : "none",
    MozUserSelect: interactable ? "auto" : "none",
  };

  return (
    <p className={styles.text} style={inlineStyles}>
      {textContent}
    </p>
  );
}

export default Text;
