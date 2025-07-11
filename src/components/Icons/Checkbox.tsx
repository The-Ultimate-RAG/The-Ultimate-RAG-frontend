import styles from "../Checkbox/Checkbox.module.css";
import React from "react";

export const Checkbox = (props: React.SVGProps<SVGElement>) => {
  return (
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
  );
};
