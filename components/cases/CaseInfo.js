import React from 'react';
import styles from '../../styles/components/Cases.module.scss';

const CaseInfo = ({ caseDetails }) => (
    <div>
        <p style={{fontSize: '15px', fontColor: 'black', fontWeight: 'normal'}}><strong>Título: </strong>{caseDetails.title}</p>
        <p style={{fontSize: '15px', fontColor: 'black', fontWeight: 'normal'}}><strong>Descripción: </strong>{caseDetails.description}</p>
    </div>
);

export default CaseInfo;
