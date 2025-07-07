import { useNavigate } from "react-router-dom";
import styles from "./SideBarChatButton.module.css";
import Text from "../../Text/Text";

interface ChatButtonProps {
  label: string;
  key: number;
}

function SideBarChatButton(props: Readonly<ChatButtonProps>) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/chat/${props.key}`);
  };

  return (
    <button className={styles.chatButton}>
      <Text textContent={props.label} colorVariant={"primary"} />
    </button>
  );
}

export default SideBarChatButton;
