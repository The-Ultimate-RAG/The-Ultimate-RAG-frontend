import styles from "./Text.module.css";
import React from "react";

type TextElement =
  | "p"
  | "span"
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "li";

type TextAlign = "left" | "center" | "right" | "justify";
type TextTransform = "none" | "capitalize" | "uppercase" | "lowercase";
type DisplayType = "inline" | "block" | "inline-block";

type FontWeight = "regular" | "bold";
type FontSize = "small" | "medium" | "large" | "huge" | "hugest";
type ColorVariant = "default" | "primary" | "secondary" | "button" | "hover";

interface TextProps {
  as?: TextElement;
  children: React.ReactNode;
  fontWeight?: FontWeight;
  fontSize?: FontSize;
  colorVariant?: ColorVariant;
  interactable?: boolean;
  textAlign?: TextAlign;
  textTransform?: TextTransform;
  display?: DisplayType;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

function Text(props: Readonly<TextProps>) {
  const {
    children,
    fontSize = "medium",
    fontWeight = "regular",
    colorVariant = "default",
    interactable = false,
    onClick,
    textTransform = "none",
    display,
    className,
    style,
    as = "p",
  } = props;

  const Component = as;

  const fontSizeClass = {
    small: styles.fontSizeSmall,
    medium: styles.fontSizeMedium,
    large: styles.fontSizeLarge,
    huge: styles.fontSizeHuge,
    hugest: styles.fontSizeHugest,
  }[fontSize];

  const colorClass = {
    default: "",
    primary: styles.colorPrimary,
    secondary: styles.colorSecondary,
    button: styles.colorButton,
    hover: styles.colorHover,
  }[colorVariant];

  const classes = [styles.text, className, colorClass, fontSizeClass]
    .filter(Boolean)
    .join(" ");

  const inlineStyles: React.CSSProperties = {
    fontWeight: fontWeight === "bold" ? "bold" : "regular",
    userSelect: interactable ? "auto" : "none",
    WebkitUserSelect: interactable ? "auto" : "none",
    MozUserSelect: interactable ? "auto" : "none",
    textTransform: textTransform,
    display: display,
    ...style,
  };

  return (
    <Component className={classes} style={inlineStyles} onClick={onClick}>
      {children}
    </Component>
  );
}

export default Text;
