import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FormLogin from '../components/form/FormLogin';
import axios from 'axios';
import RecommendedLawyers from '../components/lawyers/RecommendedLawyers';
import ListCases from '../components/cases/ListCases';
import ListNotifications from '../components/notifications/ListNotifications';

const Main = () => {

    const user = useSelector((state) => state.user)

    const [lawyers, setLawyers] = useState([])
    const [cases, setCases] = useState([])
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        if(!user.isLogin) {
            return
        }

        axios.get(process.env.NEXT_PUBLIC_API_URL_FINAL + "personlawyers").then(
            response => {
                setLawyers(response.data)
            }
        )

        axios.get(user.type == "client" ? process.env.NEXT_PUBLIC_API_URL_FINAL + "persons/" + user.id + "/consults" : process.env.NEXT_PUBLIC_API_URL_FINAL + "personlawyers/" + user.id + "/consults").then(
            response => {
                setCases(response.data)
            }
        )
        .catch (error => {
            console.error('Error fetching messages:', error);
        }) 

        axios.get(process.env.NEXT_PUBLIC_API_URL_FINAL + "notifications/persons/" + user.id).then(
            response => {
                setNotifications(response.data)
            }
        )
        .catch (error => {
            console.error('Error fetching messages:', error);
        }) 
    }, [user])
    return (
        <>
            {
                user.isLogin ? (
                    <>
                        <div>
                            <h2>Abogados Recomendados</h2>
                            {
                                lawyers.length > 0 ? (
                                    <RecommendedLawyers lawyers={lawyers} />
                                ) : (
                                    <p>No hay abogados recomendados...</p>
                                )
                            }
                        </div>

                        <div>
                            <h2>Ultimos casos</h2>
                            {
                                cases.length > 0 ? (
                                    <ListCases cases={cases.slice(0,5)} />
                                ) : (
                                    <p>No hay casos...</p>
                                )
                            }
                        </div>

                        <div>
                            <h2>Ultimas Notificaciónes</h2>
                            {
                                notifications.length > 0 ? (
                                    <ListNotifications notifications={notifications.slice(0,4)} />
                                ) : (
                                    <p>No hay notificaciones...</p>
                                )
                            }
                        </div>
                    </>
                ) : (
                    <>
                        <FormLogin />
                    </>
                )
            }
        </>
    );
}

export default Main;