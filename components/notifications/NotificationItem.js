import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios"
import styles from "../../styles/components/Notifications.module.scss"

export default function NotificationItem({notification}) {

    const router = useRouter()
    const handleClick = () => {
        
        axios.delete(process.env.NEXT_PUBLIC_API_URL_FINAL + "notifications/" + notification.id).then(
            () => {
                router.push("/case/" + notification.consult.id)
            }
        )
    }
    return (
        <>
            <div onClick={() => handleClick()} className={styles.NotificationItem}>
                <div>
                    <h3>{notification.title}</h3>
                    <p>{notification.description}</p>
                </div>
            </div>
        </>
    )
}