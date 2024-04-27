import LawyerProfileWithInformation from "./LawyerProfileWithInformation"
import styles from "../../styles/components/Lawyer.module.scss"

export default function ListLawyersSearch({lawyers}) {
    return(
        <>
            <div className={styles.ListLawyersSearch}>
                {
                    lawyers.map((element, index) => {
                        return (
                            <LawyerProfileWithInformation lawyer={element} key={index} />
                        )
                    })
                }
            </div>
        </>
    )
}