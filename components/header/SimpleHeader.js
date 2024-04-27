import styles from "../../styles/components/Header.module.scss"

export default function SimpleHeader() {
    return (
        <div className={styles.SimpleHeader}>
            <img src="/images/logo.svg" alt="Lawyeed Header Logo" />
        </div>
    )
}