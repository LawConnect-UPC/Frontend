// components/lawyers/LawyerBasicInfo.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/components/Lawyer.module.scss';

const LawyerBasicInfo = ({ lawyer }) => {


    return (
        <div className={styles.LawyerProfileWithInformation}>
            <div className={styles.LawyerProfileContent}>
                <div className={styles.LawyerProfileImage}>
                    <img src={lawyer.urlImage} alt={`${lawyer.fisrtName} ${lawyer.lastName} Lawyer Profile Image`} style={{ borderRadius: '50%' }} />
                </div>
                <div className={styles.LawyerProfileInfo}>
                    <h3>{lawyer.fisrtName} {lawyer.lastName}</h3>
                    <p>{lawyer.description}</p>
                </div>
            </div>
        </div>
    );
};

export default LawyerBasicInfo;
