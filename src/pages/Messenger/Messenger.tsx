import Chat from "../../components/Chat/Chat";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./Messenger.module.css";
import { useParams } from "react-router-dom";

function Messenger() {
  const { chatId } = useParams();

  return (
    <body className={styles.messenger}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <div className={styles.chatContainer}>
        <Chat key={chatId ?? "default"} />
      </div>
    </body>
  );
}

export default Messenger;
