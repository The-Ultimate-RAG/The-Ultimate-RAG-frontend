// PasswordVisibilityIcon.tsx
import React from "react";
import { OpenEyeIcon } from "./OpenEyeIcon";
import { ClosedEyeIcon } from "./ClosedEyeIcon";
import styles from "../../InputField/Auth/InputField.module.css";

interface PasswordVisibilityIconProps {
  isVisible: boolean;
  onMouseDown: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function PasswordVisibilityIcon(
  props: Readonly<PasswordVisibilityIconProps>,
): React.JSX.Element {
  const { isVisible, onMouseDown } = props;

  return (
    <div className={styles.eyeIconWrapper} onMouseDown={onMouseDown}>
      <OpenEyeIcon
        className={`${styles.eyeIcon} ${styles.openEyeIcon} ${
          isVisible ? styles.visible : ""
        }`}
      />
      <ClosedEyeIcon
        className={`${styles.eyeIcon} ${styles.closedEyeIcon} ${
          !isVisible ? styles.visible : ""
        }`}
      />
    </div>
  );
}

export default PasswordVisibilityIcon;
