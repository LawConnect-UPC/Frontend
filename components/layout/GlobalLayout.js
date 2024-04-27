import { Children, useEffect, useState } from "react"
import SimpleHeader from "../header/SimpleHeader"
import Header from "../header/Header"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addPlan, addUser } from "../../redux/userSlice"

export default function GlobaLayout({children}) {

    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    useEffect(() => {

        let getUserId = localStorage.getItem("id")

        if(getUserId != undefined) {
            axios.get(process.env.NEXT_PUBLIC_API_URL_FINAL + "person/" + getUserId).then(
                response => {
                    if(Object.keys(response.data).length > 0) {
                        let user = response.data
                        user.isLogin = true
                        axios.get(process.env.NEXT_PUBLIC_API_URL_FINAL + "personPlan/person/" + getUserId)
                        .then(
                            res => {
                                console.log(response.data)
                                if(res.data.length > 0) {
                                    dispatch(addPlan(res.data[0].plan))
                                }
                                dispatch(addUser(user))
                            }
                        )
                    }  else {
                        setIsLoading(false)
                    }
                }
            )
        } else {
            setIsLoading(false)
        }
        
    }, [])
    useEffect(() => {
        if(user.isLogin) {
            setIsLoading(false)
        }
    }, [user])
    return (
        <>
            {
                isLoading ? (
                    <>
                        Cargando....
                    </>
                ) : (
                    <>
                        <Header />
                        
                        <div className="body-container">
                            {children}
                        </div>
                    </>
                )
            }
        </>
    )
}