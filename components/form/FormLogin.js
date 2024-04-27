import Link from "next/link";
import Button from "../utils/Button";
import Input from "../utils/Input";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/userSlice";
import { useEffect, useState } from "react";
import Alert from "../utils/Alert";
import axios from 'axios';
import styles from "../../styles/components/Form.module.scss"

export default function FormLogin() {

    const dispatch = useDispatch()

    const [isViewAlert, setIsViewAlert] = useState(false)
    
    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    
    const [ isErrorForm, setIsErrorForm] = useState({
        email: true,
        password: true,
        incorrectCredentials: false
    })
    
    const updateStateError = ( key, value) => {
        setIsErrorForm(isErrorForm => ({...isErrorForm, [key]:value}));
    }

    const updateState = ( key, value) => {
        setForm(form => ({...form, [key]:value}));
    }

    const handleValidation  = (key, value) => {
        if(key == "password") {
            updateState(key, value)
        } 
        if(key == "email") {
            updateState(key, value)
        } 
    }

    const handleSubmit = () => {
        setIsViewAlert(true)

        if(isErrorForm.email || isErrorForm.password) {
            return
        }

        axios.get(process.env.NEXT_PUBLIC_API_URL_FINAL + "person/login?email="+ form.email + "&password=" + form.password).then(

            response => {
                updateStateError("incorrectCredentials", false)
                let user = response.data
                user.isLogin = true
                dispatch(addUser(user))
                localStorage.setItem("id", user.id)
            }
        )
        .catch(function (error) {
            updateStateError("incorrectCredentials", true)
          });
    }

    useEffect(() => {
        if(form.password != "") {
            updateStateError("password", false)
        } else {
            updateStateError("password", true)
        }

        if(form.email != "" && /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(form.email))  {
            updateStateError("email", false)
        } else {
            updateStateError("email", true)
        }
    }, [form])

    return (
        <>
            <div className={styles.form + " " + styles.formLogin}>
                <div className={styles.formBody}>
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
                    {isViewAlert && isErrorForm.incorrectCredentials && <Alert message={"Credenciales incorrectas."}/>}
                    <Button name={"Iniciar Sesion"} onClick={() => handleSubmit()} />
                </div>
                
                <div className={styles.formExtraInfo}>
                    <p>
                        <span>¿No tienes una cuenta? </span>
                        <Link href={"/register"}>
                            Registrate
                        </Link>
                    </p>
                </div>
                
            </div>
        </>
    )
}