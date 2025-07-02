import React, { useState } from "react";
import styles from "./Counter.module.css";

function Counter() {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className={styles.counterContainer}>
      <p className={styles.countDisplay}>
        <b>Log in</b>
      </p>
      <button className={styles.counterButton} onClick={increment}>
        Increment Count
      </button>
      <button className={styles.counterButton} onClick={decrement}>
        Decrement Count
      </button>
      <button className={styles.counterButton} onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default Counter;
