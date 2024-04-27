import styles from "../../styles/components/Popup.module.scss"

export default function Popup({children, showHide}) {
    const handleClick = () => {
        showHide(false)
    }
    return (
        <div className={styles.Popup}>
            <div className={styles.PopupContent}>
                <div className={styles.PopupContentBody}>
                    {children}
                </div>

                {showHide &&  (
                    <div onClick={() => handleClick()} className={styles.PopupClose}>
                        <img src={"/images/icon-close.svg"} alt={"Icon Close"} />
                    </div>
                )}
            </div>
        </div>
    )
}