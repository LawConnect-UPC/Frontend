import React, { useState } from 'react';
import axios from 'axios';
import Popup from './Popup';
import Button from '../utils/Button';
import Input from '../utils/Input';
import styles from '../../styles/components/Popup.module.scss';
import { useSelector } from 'react-redux';

export default function PopupCreateCase({ showHide, lawyerId }) {
    const user = useSelector((state) => state.user)
    const [caseDetails, setCaseDetails] = useState({
        title: '',
        description: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCaseDetails(prev => {
            const newState = { ...prev, [name]: value };
            console.log(newState);
            return newState;
        });
    };
       

    const handleSubmit = async () => {
        try {
            await axios.post(process.env.NEXT_PUBLIC_API_URL_FINAL + "consults", {
                title: caseDetails.title,
                description: caseDetails.description,
                state: 'Abierto',
                clientId: user.id,
                lawyerId: Number(lawyerId)
            })
            .then( 
                response => {
                    setIsSubmitted(true);
                }
            )
            
        } catch (error) {
            console.error('Error al crear el caso:', error);
            alert('Error al crear el caso');
        }
    };

    return (
        <Popup showHide={showHide}>
            {isSubmitted ? (
                <div className={styles.popupContainer}>
                    <p>¡FELICIDADES, HAZ CREADO EL CASO EXITOSAMENTE!</p>
                    <img src="/images/logo.svg" alt="Lawyeed Header Logo" />
                    <p>DIRÍGETE A LA SECCIÓN "MIS CASOS" PARA VER EL CASO CREADO</p>
                    <Button name="Cerrar" onClick={() => showHide(false)} />
                </div>
            ) : (
                <div className={styles.popupContainerCreate}>
                    <div style={{marginBottom:'20px'}}>
                    <p style={{alignItems: 'left'}}>Nombre del Caso</p>
                    <Input type="text" name="title" placeholder="Nombre del Caso" value={caseDetails.title} onChange={handleInputChange} showLabel={false}/>
                    </div>
                    <div style={{marginBottom:'20px'}}>
                    <p>Descripción del Caso</p>
                    <Input type="text" name="description" placeholder="Descripción del Caso" value={caseDetails.description} onChange={handleInputChange} showLabel={false}/>
                    </div>
                    <Button name="Crear Caso" onClick={handleSubmit} />
                </div>
            )}
        </Popup>
    );
}