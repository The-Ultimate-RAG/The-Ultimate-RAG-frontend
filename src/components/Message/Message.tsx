import Text from "../Text/Text";
import styles from "./Message.module.css";

interface MessageProps {
  textContent: string;
  sender: string;
}

function Message(props: Readonly<MessageProps>) {
  const { textContent, sender } = props;

  const messageStyle: string = `${styles.messageBox} ${sender === "user" ? styles.userMessageBox : styles.systemMessageBox}`;

  return (
    <div className={messageStyle}>
      <Text textContent={textContent} interactable={true} />
    </div>
  );
}

export default Message;
