import styles from "../../styles/components/Plan.module.scss"
import PlanItem from "./PlanItem"

export default function ListPlans({ plans }) {
    return (
        <>
            <div className={styles.ListPlans}>
                {plans.map((element, index) => (
                    <PlanItem plan={element} key={index} />
                ))}
            </div>
        </>
    )
}
