import NotificationItem from "./NotificationItem"
import styles from "../../styles/components/Notifications.module.scss"

export default function ListNotifications({notifications}) {

    return (
        <>
            <div className={styles.ListNotifications}>
                {
                    notifications.map((element, index) => {
                        return (
                            <NotificationItem notification={element} key={index} />
                        )
                    })
                }
            </div>
        </>
    )
}