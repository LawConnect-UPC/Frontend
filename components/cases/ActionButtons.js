import React from 'react';
import styles from '../../styles/components/Cases.module.scss';

const ActionButtons = ({ onCloseCase }) => {
    return (
        <div className={styles.actionButtons}>
            <button className={styles.closeCase} onClick={() => onCloseCase()}>Cerrar Caso</button>
            <button className={styles.createMeeting}>Crear una Reunión</button>
            <button className={styles.rateLawyer}>Calificar Abogado</button>
        </div>
    );
};

export default ActionButtons;
