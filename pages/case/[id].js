// pages/case/[id].js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSelector } from "react-redux";

import styles from '../../styles/components/Cases.module.scss';
import LawyerBasicInfo from '../../components/lawyers/LawyerBasicInfo';
import CaseInfo from '../../components/cases/CaseInfo';
import ActionButtons from '../../components/cases/ActionButtons';
import CaseMessages from '../../components/cases/CaseMessages'; // Import the messaging component

const CasePage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [caseDetails, setCaseDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (!user.isLogin || !id) {
            router.push("/");
            return;
        }

        axios.get(process.env.NEXT_PUBLIC_API_URL_FINAL + "consults/" + id)
            .then(response => {
                if (response.data) {
                    setCaseDetails(response.data);
                } else {
                    setCaseDetails(null);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching case data:', err);
                setLoading(false);
            });
    }, [id, user.isLogin]);

    const handleCloseCase = async () => {
        setCaseDetails(prev => ({ ...prev, state: 'Cerrado' }));
        try {
           await axios.put(process.env.NEXT_PUBLIC_API_URL_FINAL + "consults/" + id, {
                state: "Cerrado",
                description: caseDetails.description,
                title: caseDetails.title,
                clientId: user.id,
                lawyerId: caseDetails.lawyer.id
            }).then(
                (response) => {
                    alert('El caso ha sido cerrado.');
            })
        } catch (error) {
            console.error('Error closing case:', error);
        }
    };

    if (!user.isLogin) return <p>Por favor, inicia sesión para ver esta página.</p>;
    if (loading) return <p>Cargando...</p>;
    if (!caseDetails) return <p>No se encontró información del caso.</p>;

    return (
        <div className={styles.CasePage}>
            <div className={styles.leftColumn}>
                <div style={{marginBottom:'30px'}}>
                    <h3 style={{ fontSize: "20px", color: "black", fontWeight: "600", marginBottom: "25px", textDecoration:'underline'}}>Información del Caso</h3>
                    <CaseInfo caseDetails={caseDetails} />
                </div>
                <div style={{marginBottom:'30px'}}>
                    <h3 style={{ fontSize: "20px", color: "black", fontWeight: "600", marginBottom: "25px", textDecoration:'underline'}}>Mi Abogado</h3>
                    <LawyerBasicInfo lawyer={caseDetails.lawyer} />
                </div>
                <div style={{marginBottom:'30px'}}>
                    <h3 style={{ fontSize: "20px", color: "black", fontWeight: "600", marginBottom: "25px", textDecoration:'underline'}}>Otras Operaciones</h3>
                    <ActionButtons onCloseCase={handleCloseCase} />
                </div>
            </div>
            <div className={styles.rightColumn}>
                <CaseMessages caseId={id} caseDetails={caseDetails} clientId={user.id} /> 
            </div>
        </div>
    );
};

export default CasePage;