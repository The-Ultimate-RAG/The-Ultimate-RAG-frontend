import Chat from "../../components/Chat/Chat";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./Messenger.module.css";


function Messenger() {
  return (
    <body className={styles.messenger}>
        <aside className={styles.sidebar}>
            <Sidebar/>
        </aside>
        <div className={styles.chatContainer}>
            <Chat/>
        </div>
    </body>
  );
}

export default Messenger;