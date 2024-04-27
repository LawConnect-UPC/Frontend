import { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import PopupEditProfile from "../components/popup/PopupEditProfile";
import Button from "../components/utils/Button";
import styles from "../styles/components/Profile.module.scss";


export default function ProfilePage() {
    const user = useSelector((state) => state.user);
    const router = useRouter();

    const [showEditProfile, setShowEditProfile] = useState(false);

    const handleEditProfileClick = () => {
        setShowEditProfile(!showEditProfile);
    };

    const handleSubscriptionClick = () => {
        router.push('/suscripcion');
    };

    useEffect(() => {
        if(localStorage.getItem("id") == null) {
            router.push("/");
        }
    }, []);

    useEffect(() => {
        if (!user.isLogin) {
            return;
        }
    }, [user]);

    return (
        <>
            {user.isLogin && (
                <div className={styles.EditProfile}>
                    <div className={styles.EditProfileInformation}>
                        <img src={user.urlImage} alt={`${user.fisrtName} Image Profile`} />

                        <div>
                            <p><strong>Nombres y Apellidos</strong></p>
                            <p>{user.fisrtName} {user.lastName}</p>
                        </div>

                        <div>
                            <p><strong>Descripción</strong></p>
                            <p>{user.description}</p>
                        </div>

                        <div>
                            <p><strong>Email</strong></p>
                            <p>{user.email}</p>
                        </div>

                        {
                            user.plan.name.length > 0 && (
                                <div>
                                    <p><strong>Plan Actual</strong></p>
                                    <p>{user.plan.name} ${user.plan.price}</p>
                                </div>
                            )
                        }
                    </div>

                    <div>
                        <Button name={"Editar Perfil"} onClick={handleEditProfileClick} />
                        {
                            user.plan.name.length == 0 && <Button name={"Comprar una suscripción"} onClick={handleSubscriptionClick} />
                        }
                    </div>

                    {showEditProfile && (
                        <PopupEditProfile showHide={setShowEditProfile} />
                    )}
                </div>
            )}
        </>
    );
}
