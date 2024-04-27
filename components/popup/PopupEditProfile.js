import { useState } from "react";
import Button from "../utils/Button";
import Popup from "./Popup";
import { useRouter } from "next/router";
import FormEditProfile from "../form/FormEditProfile";

export default function PopupEditProfile({showHide}) {

    const router = useRouter()
    const handleClick = () => {
        router.push("/")
    }
    return (
        <>
            <Popup  showHide={showHide}>
                <FormEditProfile showHide={showHide}/>
            </Popup>
        </>
    )
}