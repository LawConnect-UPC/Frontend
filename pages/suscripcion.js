import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '../components/utils/Button';
import styles from "../styles/components/Form.module.scss";
import ListPlans from '../components/plans/ListPlans';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Suscripcion() {
    const router = useRouter();
    const user = useSelector((state) => state.user)

    const [plans, setPlans] = useState([])
    
  
    useEffect(() => {
        if(!user.isLogin || user.plan.name.length > 0) {
            router.push("/")
        }
    }, [])

    useEffect(() => {
        if(!user.isLogin || user.plan.name.length > 0) {
            return
        }

        axios.get(process.env.NEXT_PUBLIC_API_URL_FINAL + "plan").then(
            response => {
                setPlans(response.data)
            }
        )
    }, [user])

    return (
        <>
            {
                user.isLogin && (
                    <>
                        {
                            plans.length > 0 ? (
                                <ListPlans plans={plans}/>
                            ) : (
                                <p>
                                    No hay planes ...
                                </p>
                            )
                        }
                    </>
                )
            }
        </>
    );
}
