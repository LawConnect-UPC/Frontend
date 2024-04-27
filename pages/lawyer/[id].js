import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSelector } from "react-redux";

import LawyerProfileWithInformation from '../../components/lawyers/LawyerProfileWithInformation';
import ClientRatings from '../../components/lawyers/ClientRatings';
import RecentCases from '../../components/lawyers/RecentCases';
import PopupCreateCase from '../../components/popup/PopupCreateCase';
import styles from '../../styles/components/Lawyer.module.scss';

const LawyerPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [lawyer, setLawyer] = useState(null);
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.user);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (!user.isLogin || !id) {
            router.push("/");
            return;
        }

        axios.get(process.env.NEXT_PUBLIC_API_URL_FINAL + "personlawyers/" + id)
            .then(response => {
                if (response.data) {
                    setLawyer(response.data);
                } else {
                    setLawyer(null);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching lawyer data:', err);
                setLoading(false);
            });
    }, [id, user.isLogin]);

    if (!user.isLogin) return <p>Por favor, inicia sesión para ver esta página.</p>;
    if (loading) return <p>Cargando...</p>;
    if (!lawyer) return <p>No se encontró información del abogado.</p>;

    const handleHireClick = () => {
        setShowPopup(true);
    };

    return (
        <div className={styles.LawyerPage}>
            <div className={styles.leftColumn}>
                <div className={styles.leftColumnContent}>
                    <LawyerProfileWithInformation lawyer={lawyer} onHireClick={handleHireClick} />
                </div>
                <div className={styles.leftColumnContent}>
                    <h2>Calificaciones de Clientes</h2>
                    <ClientRatings ratings={lawyer.ratings} />
                </div>
            </div>
            <div className={styles.rightColumn}>
                <h2>Últimos Casos</h2>
                <RecentCases lawyerId={lawyer.id} limit={6} />
            </div>
            {showPopup && <PopupCreateCase showHide={setShowPopup} lawyerId={id} />}
        </div>
    );
};

export default LawyerPage;
