import { useRouter } from "next/router";
import styles from "../../styles/components/Plan.module.scss"
import Button from "../utils/Button";

export default function PlanItem({plan}) {
    const router = useRouter()

    const handlePurchase = () => {
        router.push("/pago/" + plan.id);
    
    };

    return (
        <>
            <div className={styles.formSuscription}>
                <h2 className={styles.subTitulos}>{plan.name} {plan.price}</h2>
                <p>{plan.description}</p>
                <Button  name="Comprar Plan Básico" className={styles.ButtonSuscription} onClick={() => handlePurchase()} />
            </div>
        </>
    )
}