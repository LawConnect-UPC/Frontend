import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import ListCases from "../components/cases/ListCases"
import styles from "../styles/components/Cases.module.scss";
import { useSelector } from "react-redux";

export default function Cases() {
    const router = useRouter();
    const [cases, setCases] = useState([]);
    const user = useSelector((state) => state.user)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(user.type == "client" ?  process.env.NEXT_PUBLIC_API_URL_FINAL + "persons/" + user.id + "/consults" : process.env.NEXT_PUBLIC_API_URL_FINAL + "personlawyers/" + user.id + "/consults");
                setCases(response.data);
                console.log("Cases fetched:", response.data);
            } catch (error) {
                console.error('Error fetching cases:', error);
            }
        };

        fetchData();
    }, []);

    if (!cases.length) {
        return <div>No hay casos disponibles.</div>;
    }

    return (
        <div className={styles.container}>
            <h1 style={{textDecoration:'underline', fontFamily:'Roboto', color:'black', fontWeight:'20px', fontSize:'20px', paddingBottom:'20px'}}>Tus Casos</h1>
            <ListCases cases={cases} />
        </div>
    );
}
