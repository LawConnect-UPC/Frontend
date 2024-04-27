// components/cases/CaseMessages.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/components/Cases.module.scss';
import TextArea from "../utils/TextArea"
import Button from "../utils/Button"
import { useSelector } from 'react-redux';

const CaseMessages = ({ caseDetails }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const user = useSelector((state) => state.user)
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(process.env.NEXT_PUBLIC_API_URL_FINAL + "messages/" + caseDetails.id + "/consult");
                console.log(response.data)
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
        //fetchLawyer();
        //fetchClient();
    }, []);

    const sendMessage = async () => {
        if (!newMessage.trim()) return;
        try {
            const message = {
                consultId: caseDetails.id,
                messageToSend: newMessage,
                personId: user.id
            };
            axios.post(process.env.NEXT_PUBLIC_API_URL_FINAL + "messages/", message)
            .then(
                response => {
                    console.log(caseDetails)
                    setMessages([...messages, response.data]);
                    setNewMessage("");
                    axios.post(process.env.NEXT_PUBLIC_API_URL_FINAL + "notifications/", {
                        title: "Nuevo mensaje: " + caseDetails.title,
                        description:  user.type == "client" ? "Tienes un nuevo mensaje relacionado con el " + caseDetails.title + " de " + caseDetails.lawyer.fisrtName + "." : "Tienes un nuevo mensaje relacionado con el " + caseDetails.title + " de " + caseDetails.client.fisrtName + "." ,
                        consultId: caseDetails.id,
                        personId: user.type == "client" ? caseDetails.lawyer.id : caseDetails.client.id
                    })
                }
            )
            
            
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className={styles.messagesContainer}>
            <h4 style={{color: 'black', fontSize:'17px', fontWeight:'bold', fontFamily:'Roboto', padding:'5px'}}>Mensajes</h4>
            {messages.map(msg => (
                <div key={msg.id} className={styles.message}>
                    <img src={msg.person.urlImage} alt={msg.person.fisrtName + " Image Profile"} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                    <div>
                        <strong>{msg.person.fisrtName + " " + msg.person.lastName}:</strong>
                        <p>{msg.messageToSend}</p>
                    </div>
                </div>
            ))}
            {
                caseDetails.state == "Abierto" && (
                    <>
                        <TextArea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Escribe un mensaje..."
                        ></TextArea>
                        <Button name={"Enviar Mensaje"} onClick={sendMessage} />
                    </>
                )
            }
        </div>
    );
};

export default CaseMessages;