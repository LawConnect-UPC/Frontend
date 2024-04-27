import React from 'react';
import { useRouter } from 'next/router';
import Popup from './Popup';
import Button from '../utils/Button';
import styles from '../../styles/components/Popup.module.scss';

export default function PopupSuscripcion({ showHide }) {
  const router = useRouter();

  const handleClose = () => {
    showHide(false);
    router.push('/profile');
  };

  return (
    <Popup showHide={showHide}>
      <div className={styles.popupContainer}>
        <p>¡FELICIDADES, HAZ COMPRADO UNA SUSCRIPCION EXITOSAMENTE!</p>
        <img src="/images/logo.svg" alt="Lawyeed Header Logo" />
        <p>AHORA LOS CLIENTES PUEDEN CREAR CASOS CON TU PERFIL</p>
        <Button name="Cerrar" onClick={handleClose} />
      </div>
    </Popup>
  );
}
