import Link from "next/link";
import styles from "../../styles/components/Lawyer.module.scss"

export default function LawyerProfileCircleItem({lawyer}){ 
    return (
        <>
            <Link href={"/lawyer/" + lawyer.id} className={styles.LawyerProfileCircleItem}>
                <img src={lawyer.urlImage} alt={lawyer.fisrtName + " Lawyer Profile Image"} />
                <h3>{lawyer.fisrtName} {lawyer.lastName}</h3>
                <p>{lawyer.wonCases} C. Ganados</p>
            </Link>
        </>
    )
}