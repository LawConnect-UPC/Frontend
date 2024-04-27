import { useEffect, useState } from "react";
import Input from "../components/utils/Input";
import { get } from "firebase/database";
import axios from "axios";
import ListLawyersSearch from "../components/lawyers/ListLawyersSearch";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function SearchPage() {
    
    const [value, setValue] = useState("")
    const [lawyers, setLawyers] = useState([])
    const [lawyersFilters, setLawyersFilters] = useState([])

    const user = useSelector((state) => state.user)
    const router = useRouter()
    const handleTyping = (value) => {
        setValue(value)
    }

    useEffect(() => {
        if(localStorage.getItem("id") == null) {
            router.push("/")
        }
        
        axios.get(process.env.NEXT_PUBLIC_API_URL_FINAL + "personlawyers/")
            .then(
                (response) => {
                    setLawyers(response.data)
                }
            )
    }, [])

    useEffect(() => {
        if(!user.isLogin) {
            return
        }

        if(value.length > 0) {
            let filter = lawyers.filter((obj) => {
                return obj.fisrtName.includes(value) || obj.lastName.includes(value)
            })
            setLawyersFilters(filter)
        } 
    }, [value])
    return (
        <>
            {
                user.isLogin && (
                    <>
                        <h2>Buscar Abogado</h2>

                        <Input 
                            type="text"
                            placeholder={"Ingresa el nombre de un abogado"}
                            value={value}
                            onChange={(e) => handleTyping(e.target.value)}
                        />

                        {
                            lawyers.length > 0 && (
                                <>
                                    <ListLawyersSearch lawyers={value.length > 0 ? lawyersFilters : lawyers} />
                                </>
                            )
                        }
                    </>
                )
            }
        </>
    )
}