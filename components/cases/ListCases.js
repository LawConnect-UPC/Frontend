import CaseItem from "./CaseItem"
import styles from "../../styles/components/Cases.module.scss"

export default function ListCases({ cases }) {
    return (
        <div className={styles.ListCasesGrid}>
            {cases.map((element, index) => (
                <CaseItem caseData={element} key={index} />
            ))}
        </div>
    )
}
