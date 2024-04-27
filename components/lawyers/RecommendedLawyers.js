import LawyerProfileCircleItem from "./LawyerProfileCircleItem"
import styles from "../../styles/components/Lawyer.module.scss"

export default function RecommendedLawyers({lawyers}) {

    return (
        <>
            <div className={styles.RecommendedLawyers}>
                {
                    lawyers.map((element, index) => {
                        return (
                            <LawyerProfileCircleItem lawyer={element} key={index} />
                        )
                    })
                }
            </div>
        </>
    )
}