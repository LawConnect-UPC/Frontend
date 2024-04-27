import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ListNotifications from "../components/notifications/ListNotifications"
import axios from "axios"
import { useRouter } from "next/router"

export default function NotificationsPage() {
    
    const user = useSelector((state) => state.user)
    const router = useRouter()

    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        if(localStorage.getItem("id") == null) {
            router.push("/")
        }
    }, [])

    useEffect(() => {
        if(!user.isLogin) {
            return
        }

        axios.get(process.env.NEXT_PUBLIC_API_URL_FINAL + "notifications/persons/" + user.id).then(
            response => {
                setNotifications(response.data)
            }
        )
    }, [user])

    return (
        <>
            {
                user.isLogin && (
                    <div>
                        <h2>Ultimas Notificaciónes</h2>
                        {
                            notifications.length > 0 ? (
                                <ListNotifications notifications={notifications} />
                            ) : (
                                <p>No hay notificaciones...</p>
                            )
                        }
                    </div>
                )
            }
        </>
    )
}