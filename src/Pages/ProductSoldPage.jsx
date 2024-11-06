import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import './css/ProductSoldPage.css';

export default function ProductSoldPage() {

    const navigate = useNavigate();
    const [ListeVerkaufterProdukte, setListeVerkaufterProdukte] = useState("")
    const ListeVerkaufterProdukte2 = [ListeVerkaufterProdukte]
    const mappedListeVerkaufterProdukte = ListeVerkaufterProdukte2.map
        (verkauftesProdukt => <ul>{verkauftesProdukt}</ul>)
    const benutzerId = localStorage.getItem('benutzerId')
    useEffect(() => {
        const fetchSoldItems = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/benutzer/soldItems`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setListeVerkaufterProdukte(data.ListeVerkaufterProdukte)
                } else {
                    console.error("Fehler beim Abrufen der Benutzerdaten.")
                }
            } catch (error) {
                console.error("Es ist ein Fehler aufgetreten: ", error)
            }
        }
    });
    return (

        <main>
            <h1>Product sold</h1>
            <div className="listeVerkaufterProdukte">
                <ul>{mappedListeVerkaufterProdukte}</ul>
            </div>
        </main>
    )
}