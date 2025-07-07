import React, { useState } from "react";
import styles from "./Checkbox.module.css";
import Text from "../Text/Text";

interface CheckboxProps {
  label: React.ReactNode;
  size?: string;
}

function Checkbox(props: Readonly<CheckboxProps>) {
  const [isChecked, setIsChecked] = useState(false);

  const { size = "14px" } = props;

  const checkboxInlineStyles: React.CSSProperties = {
    width: size,
    height: size,
  };

  const fontInlineStyles: React.CSSProperties = {
    fontSize: size,
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.checkboxWrapper}>
      <label className={styles.checkboxLabel}>
        <input
          type={"checkbox"}
          className={styles.checkbox}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span className={styles.customCheckbox} style={checkboxInlineStyles}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={styles.checkmarkIcon}
          >
            <path
              className={styles.checkmarkPath}
              fill="none"
              stroke="var(--text-color-button)"
              strokeWidth="3"
              d="M4 12.6111L8.92308 17.5L20 6.5"
            />
          </svg>
        </span>
        <span className={styles.labelText} style={fontInlineStyles}>
          <Text textContent={props.label} fontSize={size} />
        </span>
      </label>
    </div>
  );
}

export default Checkbox;
