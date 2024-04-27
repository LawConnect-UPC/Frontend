import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import FormRegister from "../components/form/FormRegister"
import PopupRegister from "../components/popup/PopupRegister"

export default function Register() {

    const user = useSelector((state) => state.user)
    const router = useRouter()

    const [isEndRegister, setIsEndRegister] = useState(false)

    useEffect(() => {
        if(user.isLogin) {
            router.push("/")
        }
    })
    return (
        <>
            {
                !user.isLogin && (
                    <>
                        <FormRegister setIsEndRegister={setIsEndRegister}/> 
                        
                        {
                            isEndRegister && <PopupRegister />
                        }
                    </>
                )
            }
        </>
    )
}