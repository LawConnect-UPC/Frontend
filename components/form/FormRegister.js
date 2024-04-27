import Link from "next/link";
import Button from "../utils/Button";
import Input from "../utils/Input";
import { useEffect, useState } from "react";
import Alert from "../utils/Alert";
import axios from "axios";
import styles from "../../styles/components/Form.module.scss"

export default function FormRegister({setIsEndRegister}) {

    const [isViewAlert, setIsViewAlert] = useState(false)

    const [form, setForm] = useState({
        nombres: "",
        apellidos: "",
        email: "",
        password: ""
    })
    
    const [ isErrorForm, setIsErrorForm] = useState({
        nombres: true,
        apellidos: true,
        email: true,
        password: true,
    })
    
    const updateStateError = ( key, value) => {
        setIsErrorForm(isErrorForm => ({...isErrorForm, [key]:value}));
    }

    const updateState = ( key, value) => {
        setForm(form => ({...form, [key]:value}));
    }

    const handleValidation  = (key, value) => {
        if(key == "nombres" && /^[a-zA-Z\s]*$/.test(value)) {
            updateState(key, value)
        } 
        if(key == "apellidos" && /^[a-zA-Z\s]*$/.test(value)) {
            updateState(key, value)
        } 
        if(key == "password") {
            updateState(key, value)
        } 
        if(key == "email") {
            updateState(key, value)
        } 
    }
    const handleClick = () => {
        setIsViewAlert(true)

        if(isErrorForm.nombres || isErrorForm.apellidos || isErrorForm.email || isErrorForm.password) {
            return
        }

        axios.post(process.env.NEXT_PUBLIC_API_URL_FINAL + "person/register", {
            fisrtName: form.nombres,
            lastName: form.apellidos,
            email: form.email,
            description: "Nuevo Usuario de LawConnect",
            urlImage: "/images/person.jpg",
            type: "client",
            password: form.password,
        }).then(
            response => {
                setIsEndRegister(true)
            }
        )
    }

    useEffect(() => {
        if(form.password != "") {
            updateStateError("password", false)
        } else {
            updateStateError("password", true)
        }

        if(form.email != "" && /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(form.email)) {
            updateStateError("email", false)
        } else {
            updateStateError("email", true)
        }

        if(form.nombres != "" && form.nombres.length >= 3) {
            updateStateError("nombres", false)
        } else {
            updateStateError("nombres", true)
        }

        if(form.apellidos != "" && form.nombres.length >= 3) {
            updateStateError("apellidos", false)
        } else {
            updateStateError("apellidos", true)
        }
    }, [form])

    return (
        <>
            <div className={styles.form + " " + styles.formLogin}>
                <div className={styles.formBody}>
                    <div>
                        <Input 
                            type="text" 
                            name={"Nombres"} 
                            placeholder={"Ingresa tus nombres"}
                            alert={isViewAlert && isErrorForm.nombres && <Alert message={"Campo invalido, ingrese información correcta."}/>}
                            value={form.nombres} 
                            onChange={(e) => {handleValidation("nombres", e.target.value)}}
                        />

                        <Input 
                            type="text" 
                            name={"Apellidos"} 
                            placeholder={"Ingresa tus apellidos"}
                            alert={isViewAlert && isErrorForm.apellidos && <Alert message={"Campo invalido, ingrese información correcta."}/>}
                            value={form.apellidos} 
                            onChange={(e) => {handleValidation("apellidos", e.target.value)}}
                        />
                    </div>

                    <Input 
                        type="text" 
                        name={"Email"} 
                        placeholder={"Ingresa tu email"} 
                        alert={isViewAlert && isErrorForm.email && <Alert message={"Campo invalido, ingrese información correcta."}/>}
                        value={form.email} 
                        onChange={(e) => {handleValidation("email", e.target.value)}}
                        />

                    <Input 
                        type="password" 
                        name={"Password"} 
                        placeholder={"Ingresa tu password"}
                        alert={isViewAlert && isErrorForm.password && <Alert message={"Campo invalido, ingrese información correcta."}/>}
                        value={form.password} 
                        onChange={(e) => {handleValidation("password", e.target.value)}}
                    />
                    <Button name={"Registrarse"} onClick={() => handleClick()}/>
                </div>
                
                <div className={styles.formExtraInfo}>
                    <p>
                        <span>¿Tienes cuenta? </span>
                        <Link href={"/"}>
                            Inicia sesión
                        </Link>
                    </p>
                </div>
                
            </div>
        </>
    )
}