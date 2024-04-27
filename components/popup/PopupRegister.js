import { useState } from "react";
import Button from "../utils/Button";
import Popup from "./Popup";
import { useRouter } from "next/router";

export default function PopupRegister({data}) {

    const router = useRouter()
    const handleClick = () => {
        router.push("/")
    }
    return (
        <>
            <Popup>
                <p>¡Felicidades, te has registrado exitosamente!</p>
                <Button onClick={() => handleClick()} name={"Regresar al inicio"} />
            </Popup>
        </>
    )
}