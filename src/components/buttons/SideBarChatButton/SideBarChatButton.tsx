import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styles from "./SideBarChatButton.module.css";
import Text from "../../Text/Text";

interface ChatButtonProps {
  title: string;
  chatId: string;
}

function SideBarChatButton(props: Readonly<ChatButtonProps>) {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    navigate(`/chats/${props.chatId}`);
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
    <button
      className={styles.chatButton}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <Text colorVariant={isActive ? "button" : "primary"}>{props.title}</Text>
    </button>
  );
}

export default SideBarChatButton;
