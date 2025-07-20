import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styles from "./SideBarChatButton.module.css";
import Text from "../../Text/Text";

interface ChatButtonProps {
  title: string;
  isActive: boolean;
  chatId: string;
  className?: string;
}

function SideBarChatButton(props: Readonly<ChatButtonProps>) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/chats/${props.chatId}`);
  };

  return (
    <button
      className={`${styles.chatButton} ${props.isActive ? styles.active : styles.inactive} ${props.className}`}
      onClick={handleClick}
      disabled={props.isActive}
    >
      <Text colorVariant={props.isActive ? "button" : "primary"}>
        {props.title}
      </Text>
    </button>
  );
}

export default SideBarChatButton;
