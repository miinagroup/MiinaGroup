import styles from "./NewButton.module.css";

const NewButton = ({title, onClick, isVisible}) => {
    return <button className={`${styles.aboutNewBtn} ${isVisible ? styles.visible : styles.unvisible}`} onClick={() => onClick()}>{title}</button>
}

export default NewButton;