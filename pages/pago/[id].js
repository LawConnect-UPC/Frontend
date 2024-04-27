import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '../../components/utils/Button';
import Input from '../../components/utils/Input';
import PopupSuscripcion from '../../components/popup/PopupSuscripcion';
import styles from '../../styles/components/Form.module.scss';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Alert from '../../components/utils/Alert';

const subscriptionDetails = {
  basico: {
    title: "Plan Básico",
    description: "Acceso básico a nuestros servicios con soporte limitado. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet efficitur aliquet. Phasellus a ligula consectetur ipsum sodales tincidunt eu non ligula.",
    price: 15
  },
  premium: {
    title: "Plan Premium",
    description: "Acceso completo a todos los servicios y soporte prioritario. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet efficitur aliquet. Phasellus a ligula consectetur ipsum sodales tincidunt eu non ligula.",
    price: 20
  },
  business: {
    title: "Plan Business",
    description: "Todos los beneficios premium más características adicionales para empresas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet efficitur aliquet. Phasellus a ligula consectetur ipsum sodales tincidunt eu non ligula.",
    price: 25
  }
};

export default function Pago() {
    const router = useRouter();
    const user = useSelector((state) => state.user)

    const [showPopup, setShowPopup] = useState(false);
    const [plan, setPlan] = useState({})
    const [isViewAlert, setIsViewAlert] = useState(false)
    const [form, setForm] = React.useState({
        titular: "",
        tarjeta: "",
        vencimiento: "",
        cvv: ""
    });

    const { id } = router.query;    

    useEffect(() => {
        if(!user.isLogin || user.plan.name.length > 0) {
            router.push("/")
        }
    }, [])

    useEffect(() => {
        if(!user.isLogin || !router.isReady || user.plan.name.length > 0) {
            return
        }

        axios.get(process.env.NEXT_PUBLIC_API_URL_FINAL + "plan/" + id).then(
            response => {
                setPlan(response.data)
            }
        )
    }, [user, router.isReady])

    const [ isErrorForm, setIsErrorForm] = useState({
        titular: true,
        tarjeta: true,
        vencimiento: true,
        cvv: true,
    })
    
    const updateStateError = ( key, value) => {
        setIsErrorForm(isErrorForm => ({...isErrorForm, [key]:value}));
    }

    const updateState = ( key, value) => {
        setForm(form => ({...form, [key]:value}));
    }

    const handleValidation  = (key, value) => {
        if(key == "titular" && /^[a-zA-Z\s]*$/.test(value)) {
            updateState(key, value)
        } 
        if(key == "tarjeta" && /^[0-9\s]*$/.test(value)) {
            updateState(key, value)
        } 
        if(key == "vencimiento") {
            updateState(key, value)
        } 
        if(key == "cvv"  && /^[0-9\s]*$/.test(value)) {
            updateState(key, value)
        } 
    }
    const handleClick = () => {
        setIsViewAlert(true)

        if(isErrorForm.titular || isErrorForm.tarjeta || isErrorForm.vencimiento || isErrorForm.cvv) {
            return
        }

        axios.post(process.env.NEXT_PUBLIC_API_URL_FINAL + "personplan", {
            date: new Date(new Date().getMonth() + 1).toISOString(),
            personId: user.id.toString(),
            planId: id,
        }).then(
            response => {
                setShowPopup(true)
            }
        )
    }

    useEffect(() => {
        if(form.titular != "") {
            updateStateError("titular", false)
        } else {
            updateStateError("titular", true)
        }

        if(form.tarjeta != "" && form.tarjeta.length >= 16) {
            updateStateError("tarjeta", false)
        } else {
            updateStateError("tarjeta", true)
        }

        if(form.nombres != "" && form.vencimiento.length == 5) {
            updateStateError("vencimiento", false)
        } else {
            updateStateError("vencimiento", true)
        }

        if(form.apellidos != "" && form.cvv.length == 3) {
            updateStateError("cvv", false)
        } else {
            updateStateError("cvv", true)
        }
    }, [form])

  return (
    <>
        {
            user.isLogin && (
                <>
                    {
                        Object.keys(plan).length > 0 ? (
                            <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
                                <h1 className={styles.titulos} style={{ paddingBottom: '25px'}}>Información del Plan</h1>
                                
                                <div>
                                    <h2 className={styles.subTitulos}>{plan.title}</h2>
                                    <p>{plan.description}</p>
                                </div>
                                
                                <div className={styles.planPayment} style={{ paddingBottom: '20px'}}>
                                    <h2 className={styles.subTitulos}>Total a Pagar</h2>
                                    <div className={styles.paymentDetails}>
                                        <div>{plan.name}</div>
                                        <div>$ {plan.price}</div>
                                    </div>
                                </div>
                                
                                <div style={{ paddingBottom: '15px'}}>
                                    <h2 className={styles.subTitulos}>Información Bancaria</h2>
                                    <div className={styles.miniTitulos}>
                                        <div>
                                            <h3>Nombre del Titular</h3>
                                            <Input type="text" name="titular" placeholder="Nombre del Titular" value={form.titular} onChange={(e) => handleValidation("titular", e.target.value)} showLabel={false} alert={isViewAlert && isErrorForm.titular && <Alert message={"Campo invalido, ingrese información correcta."}/>}/>
                                        </div>
                                        
                                        <div>
                                            <h3>Numero de tarjeta</h3>
                                            <Input type="text" name="tarjeta" placeholder="Número de Tarjeta" value={form.tarjeta} onChange={(e) => handleValidation("tarjeta", e.target.value)} showLabel={false} alert={isViewAlert && isErrorForm.tarjeta && <Alert message={"Campo invalido, ingrese información correcta."}/>}/>
                                        </div>
                                        
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div style={{ flex: 1, marginRight: '10px' }}>
                                                <h3>Fecha de Vencimiento</h3>
                                                <Input type="text" name="vencimiento" placeholder="Fecha de Vencimiento MM/AA" value={form.vencimiento} onChange={(e) => handleValidation("vencimiento", e.target.value)} showLabel={false} alert={isViewAlert && isErrorForm.vencimiento && <Alert message={"Campo invalido, ingrese información correcta."}/>}/>
                                            </div>

                                            <div style={{ flex: 1, marginLeft: '10px' }}>
                                                <h3>CVV</h3>
                                                <Input type="text" name="cvv" placeholder="CVV" value={form.cvv} onChange={(e) => handleValidation("cvv", e.target.value)} showLabel={false} alert={isViewAlert && isErrorForm.cvv && <Alert message={"Campo invalido, ingrese información correcta."}/>}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button name="Pagar Suscripción" onClick={() => handleClick()} />
                                {showPopup && <PopupSuscripcion showHide={setShowPopup} />}
                            </div>
                        ) : (
                            <p>
                                No hay plan...
                            </p>
                        )
                    }
                </>
            )
        }
    </>
  );
}
