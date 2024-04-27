import Link from "next/link";
import styles from "../../styles/components/Header.module.scss"

export default function HeaderMenu(){
    return (
        <>
            <div className={styles.HeaderMenu}>
                <Link href={"/"}>
                    Inicio
                </Link>

                <Link href={"/notifications"}>
                    Notificaciones
                </Link>

                <Link href={"/search"}>
                    Buscar
                </Link>

                <Link href={"/cases"}>
                    Casos
                </Link>
            </div>
        </>
    )
}