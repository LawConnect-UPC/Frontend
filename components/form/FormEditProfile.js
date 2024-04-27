import Link from "next/link";
import Button from "../utils/Button"
import Input from "../utils/Input"
import { useEffect, useState } from "react"
import Alert from "../utils/Alert";
import axios from "axios";
import TextArea from "../utils/TextArea"
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/userSlice";

export default function FormEditProfile({showHide}) {

    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const [isViewAlert, setIsViewAlert] = useState(false)
    
    const [form, setForm] = useState({
        fisrtName: user.fisrtName,
        lastName: user.lastName,
        email: user.email,
        description: user.description,
        urlImage: user.urlImage,
        password: user.password
    })
    
    const [ isErrorForm, setIsErrorForm] = useState({
        fisrtName: user.fisrtName != "" ? true : false,
        lastName: user.lastName != "" ? true : false,
        email: user.email != "" ? true : false,
        description: user.description != "" ? true : false,
        urlImage: user.urlImage != "" ? true : false
    })
    
    const updateStateError = ( key, value) => {
        setIsErrorForm(isErrorForm => ({...isErrorForm, [key]:value}));
    }

    const updateState = ( key, value) => {
        setForm(form => ({...form, [key]:value}));
    }

    const handleValidation  = (key, value) => {
        if(key == "fisrtName" && /^[a-zA-Z\s]*$/.test(value)) {
            updateState(key, value)
        } 
        if(key == "lastName" && /^[a-zA-Z\s]*$/.test(value)) {
            updateState(key, value)
        } 
        if(key == "email") {
            updateState(key, value)
        } 
        if(key == "description") {
            updateState(key, value)
        } 
        if(key == "urlImage") {
            updateState(key, value)
        } 
    }

    const handleClick = () => {
        setIsViewAlert(true)

        if(isErrorForm.fisrtName || isErrorForm.lastName || isErrorForm.email || isErrorForm.description || isErrorForm.urlImage) {
            return
        }
        
        showHide(false)

        
            axios.put(process.env.NEXT_PUBLIC_API_URL_FINAL + "person/?id=" + user.id, {
                id: user.id,
                fisrtName: form.fisrtName,
                lastName: form.lastName,
                urlImage: form.urlImage,
                email: form.email,
                description: form.description,
                type: user.type,
                password: user.password
            }).then(
                response => {
                    dispatch(updateUser(form))
                }
            )
       
    }

    useEffect(() => {
        if(form.description != "" && form.description.length >= 10) {
            updateStateError("description", false)
        } else {
            updateStateError("description", true)
        }

        if(form.urlImage != "" && form.urlImage.length >= 10) {
            updateStateError("urlImage", false)
        } else {
            updateStateError("urlImage", true)
        }

        if(form.email != "" && /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(form.email)) {
            updateStateError("email", false)
        } else {
            updateStateError("email", true)
        }

        if(form.fisrtName != "" && form.fisrtName.length >= 3) {
            updateStateError("fisrtName", false)
        } else {
            updateStateError("fisrtName", true)
        }

        if(form.lastName != "" && form.fisrtName.length >= 3) {
            updateStateError("lastName", false)
        } else {
            updateStateError("lastName", true)
        }
    }, [form])

    return (
        <>
            <Input 
                type="text" 
                name={"fisrtName"} 
                placeholder={"Ingresa tus fisrtName"}
                alert={isViewAlert && isErrorForm.fisrtName && <Alert message={"Campo invalido, ingrese información correcta."}/>}
                value={form.fisrtName} 
                onChange={(e) => {handleValidation("fisrtName", e.target.value)}}
            />

            <Input 
                type="text" 
                name={"lastName"} 
                placeholder={"Ingresa tus lastName"}
                alert={isViewAlert && isErrorForm.lastName && <Alert message={"Campo invalido, ingrese información correcta."}/>}
                value={form.lastName} 
                onChange={(e) => {handleValidation("lastName", e.target.value)}}
            />

            <TextArea 
                type="text" 
                name={"Descripçion"} 
                placeholder={"Ingresa tu descripcion"} 
                alert={isViewAlert && isErrorForm.description && <Alert message={"Campo invalido, ingrese información correcta."}/>}
                value={form.description} 
                onChange={(e) => {handleValidation("description", e.target.value)}}
            />

            <Input 
                type="text" 
                name={"Email"} 
                placeholder={"Ingresa tu email"} 
                alert={isViewAlert && isErrorForm.email && <Alert message={"Campo invalido, ingrese información correcta."}/>}
                value={form.email} 
                onChange={(e) => {handleValidation("email", e.target.value)}}
            />

            <Input 
                type="text" 
                name={"Enlace de Pefil"} 
                placeholder={"Ingresa tu enlace de perfil"} 
                alert={isViewAlert && isErrorForm.urlImage && <Alert message={"Campo invalido, ingrese información correcta."}/>}
                value={form.urlImage} 
                onChange={(e) => {handleValidation("urlImage", e.target.value)}}
            />


            <Button name={"Actualizar Perfil"} onClick={() => handleClick()}/>
        </>
    )
}