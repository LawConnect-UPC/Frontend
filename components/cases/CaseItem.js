import Link from "next/link";
import styles from "../../styles/components/Cases.module.scss"

export default function CaseItem({ caseData }) {
    return (
        <Link href={"/case/" + caseData.id} className={styles.CaseItem}>
            <div className={styles.CaseDetails}>
                <h3>{caseData.title}</h3>
                <p>{caseData.description}</p>
            </div>
            <div className={`${styles.CaseState} ${caseData.state === "Abierto" ? styles.Abierto : styles.Cerrado}`}>
                {caseData.state}
            </div>
        </Link>
    )
}
