// src/components/SideBar/SideBar.tsx
import React, { useState } from "react" // Добавлено useState
import Button from "../Button/Button";
import SearchButton from "../Button/SearchButton";
import styles from "./SideBar.module.css";


function SideBar() {
    const [isSearchExpanded, setIsSearchExpanded] = useState(false); // Новое состояние
    const commonButtonHeight = "80px";
    // Функция, которую SearchButton будет вызывать для обновления состояния
    const handleSearchToggle = (expanded: boolean) => {
        setIsSearchExpanded(expanded);
    };

    // Опционально: функция для обработки поискового запроса
    const handleSearchSubmit = (query: string) => {
        console.log("Поисковый запрос:", query);
        // Добавьте здесь вашу логику поиска
    };

    return(
        <aside>
            <div className={styles["button-container"]}>
                <div className={isSearchExpanded ? styles["hide-neighbor"] : ''}>
                <Button
                    text="+ Add new chat"
                    width="400px" // Ваш исходный width
                    heigth={commonButtonHeight}
                />
                </div>
                <SearchButton
                    onSearch={handleSearchSubmit}
                    onToggleExpand={handleSearchToggle} // Передаем колбэк
                    initialSize={commonButtonHeight}
                />
            </div>
        </aside>
    );
}

export default SideBar;