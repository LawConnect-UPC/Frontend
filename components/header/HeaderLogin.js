import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import Button from "../utils/Button"
import { removeUser } from "../../redux/userSlice"
import HeaderMenu from "./HeaderMenu"
import styles from "../../styles/components/Header.module.scss"

export default function HeaderLogin() {

    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(removeUser())
        localStorage.removeItem("id")
    }
    return (
        <>
            <div className={styles.HeaderLogin}>
                <div className={styles.HeaderLoginPrincipal}>
                    <Link href={"#"}>
                        <img src="/images/logo.svg" alt="Lawyeed Header Logo" />
                    </Link>
                    
                    <div className={styles.HeaderLoginProfile}>
                        <div className={styles.HeaderLoginInfo}>
                            <p>{user.fisrtName} {user.lastName}</p>
                            <p>{user.email}</p>
                        </div>
                        <Link href={"/profile/"} className={styles.HeaderLoginImage}>
                            <img src={user.urlImage} alt={user.fisrtName + " Profile Image"} />
                        </Link>
                        <div className={styles.CloseSession}>
                            <Button name={"Salir"} onClick={() => handleClick()}/>
                        </div>
                    </div>
                </div>
                <HeaderMenu />
            </div>
        </>
    )
}