import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styles from "./SideBarChatButton.module.css";
import Text from "../../Text/Text";

interface ChatButtonProps {
  label: string;
  key: number;
}

function SideBarChatButton(props: Readonly<ChatButtonProps>) {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  
  const handleClick = () => {
    navigate(`/chat/${props.key}`);
    setIsActive(true);
  };

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };

  return (
    <button className={styles.chatButton}>
      <Text colorVariant={isActive ? "button" : "primary"}>
      {props.label}
      </Text>
    </button>
  );
}

export default SideBarChatButton;
