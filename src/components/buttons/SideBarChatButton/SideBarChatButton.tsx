import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styles from "./SideBarChatButton.module.css";
import Text from "../../Text/Text";

interface ChatButtonProps {
  title: string;
  chatId: string;
  isActive: boolean;
}

function SideBarChatButton(props: Readonly<ChatButtonProps>) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/chats/${props.chatId}`);
  };

  return (
    <button
      className={`${styles.chatButton} ${props.isActive ? styles.active : styles.inactive}`}
      onClick={handleClick}
    >
      <Text colorVariant={props.isActive ? "button" : "primary"}>
        {props.title}
      </Text>
    </button>
  );
}

export default SideBarChatButton;
