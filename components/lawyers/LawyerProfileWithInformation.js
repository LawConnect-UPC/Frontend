import Link from "next/link";
import styles from "../../styles/components/Lawyer.module.scss";

export default function LawyerProfileWithInformation({ lawyer, onHireClick }) {
    return (
        <>
            <div className={styles.LawyerProfileWithInformation}>
                <div className={styles.LawyerProfileContent}>
                    <div className={styles.LawyerProfileImage}>
                        <img src={lawyer.urlImage} alt={lawyer.fisrtName + " Lawyer Profile Image"} />
                    </div>

                    <div className={styles.LawyerProfileInfo}>
                        <h3>{lawyer.fisrtName} {lawyer.lastName}</h3>
                        <p>{lawyer.description}</p>
                    </div>
                </div>

                <div className={styles.LawyerProfileCases}>
                    <p><strong>{lawyer.wonCases}</strong> Casos Ganados</p>
                    <p><strong>{lawyer.totalCases}</strong> Casos Totales</p>
                </div>
                
                <button onClick={onHireClick} className={styles.LawyerProfileLink}>
                    {
                        onHireClick != undefined ? (
                            <>
                                Contratar
                            </>
                        ) : (
                            <>
                                <Link href={"/lawyer/" + lawyer.id} className={styles.LinkGo}>
                                    Ver Perfil
                                </Link>
                            </>
                        )
                    }
                </button>
            </div>
        </>
    );
}