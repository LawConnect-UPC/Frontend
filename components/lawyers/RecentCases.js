import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CaseItem from '../cases/CaseItem';

const RecentCases = ({ lawyerId, limit = 6 }) => {
    const [cases, setCases] = useState([]);

    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_API_URL_FINAL + "personlawyers/" + lawyerId + "/consults")
            .then(response => {
                setCases(response.data);
            })
            .catch(error => console.error('Error fetching recent cases:', error));
    }, [lawyerId, limit]);

    if (!cases.length) return <p>No hay casos recientes.</p>;

    return (
        <div>
            {cases.map(caseItem => (
                <CaseItem key={caseItem.id} caseData={caseItem} />
            ))}
        </div>
    );
};

export default RecentCases;
