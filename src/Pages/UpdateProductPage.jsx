import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/Product_CreatePage.css";
import axios from "axios";


const ZUSTAND_ENUM = ["NEU", "WIE_NEU", "GEBRAUCHSSPUREN"];
const KATEGORIE_ENUM = ["KLEIDUNG", "MOEBEL", "SPIELZEUG"];

export default function UpdateProductPage() {
    const navigate = useNavigate();
    const { productId } = useParams(); // ID
    const [lieferung, setLieferung] = useState(false);
    const [titel, setTitel] = useState("");
    const [beschreibung, setBeschreibung] = useState("");
    const [anzahl, setAnzahl] = useState("");
    const [preis, setPreis] = useState("");
    const [zustand, setZustand] = useState(ZUSTAND_ENUM[0]);
    const [marke, setMarke] = useState("");
    const [kategorie, setKategorie] = useState(KATEGORIE_ENUM[0]);
    const [imgFile, setImgFile] = useState(null); // 
    const [benutzerId, setBenutzerId] = useState(null); //  ID
    const [imgUrl, setImgUrl] = useState(""); //  URL


    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/produkte/${productId}`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });

                if (response.status === 200) {
                    const data = response.data;
                    setLieferung(data.lieferung);
                    setTitel(data.titel);
                    setBeschreibung(data.beschreibung);
                    setAnzahl(data.anzahl);
                    setPreis(data.preis);
                    setZustand(data.zustand);
                    setMarke(data.marke);
                    setKategorie(data.kategorie);
                    setBenutzerId(data.benutzerId); //  ID
                    setImgUrl(data.imgUrl); //  URL
                } else {
                    toast.error("Fehler beim Abrufen der Produktdaten.");
                }
            } catch (error) {
                toast.error("Fehler: " + error.message);
            }
        };

        fetchProductDetails();
    }, [productId]);

    const handleUpdateProduct = async (event) => {
        event.preventDefault();
        if (!titel || !beschreibung || !anzahl || !preis || !marke || !zustand || !kategorie) {
            toast.error("Bitte füllen Sie alle Pflichtfelder aus.");
            return;
        }
        if (!anzahl || parseInt(anzahl, 10) <= 0) {
            toast.error("Bitte geben Sie eine gültige Anzahl ein.");
            return;
        }

        try {
            const updatedProduct = {
                lieferung,
                titel,
                beschreibung,
                anzahl: parseInt(anzahl, 10),
                preis: parseFloat(preis),
                zustand,
                kategorie,
                marke,
                benutzerId: benutzerId, // Benutzer ID
                imgUrl: imgUrl || "dummy", //  imgUrl  "dummy"
                deleteUrl: imgUrl ? "" : "dummy" //  imgUrl，deleteUrl "dummy"
            };

            //  imgFile
            const formData = new FormData();
            for (const key in updatedProduct) {
                formData.append(key, updatedProduct[key]);
            }
            if (imgFile) {
                formData.append("imgFile", imgFile);
            }

            const response = await axios.put(
                `http://localhost:8080/api/v1/product/${productId}`,
                formData,
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                toast.success("Produkt erfolgreich aktualisiert!");
                setTimeout(() => {
                    navigate("/marktplatz");
                }, 1300);
            } else {
                toast.error("Fehler beim Aktualisieren des Produkts: " + (response.data.message || "Unbekannter Fehler"));
            }
        } catch (error) {
            toast.error("Fehler: " + error.message);
        }
    };
    return (
        <div className="form-container">
            <form className="form" onSubmit={handleUpdateProduct}>
                <div className="form-group">
                    <label>Lieferung:</label>
                    <div className="lieferung-options">
                        <label>
                            <input
                                type="radio"
                                name="lieferung"
                                value="ja"
                                checked={lieferung}
                                onChange={() => setLieferung(true)}
                            />{" "}
                            Ja
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="lieferung"
                                value="nein"
                                checked={!lieferung}
                                onChange={() => setLieferung(false)}
                            />{" "}
                            Nein
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <label>Titel:</label>
                    <input
                        type="text"
                        value={titel}
                        onChange={(e) => setTitel(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Beschreibung:</label>
                    <textarea
                        value={beschreibung}
                        onChange={(e) => setBeschreibung(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Anzahl:</label>
                    <input
                        type="number"
                        value={anzahl}
                        onChange={(e) => setAnzahl(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Preis:</label>
                    <div className="price-input">
                        <input
                            type="number"
                            value={preis}
                            onChange={(e) => setPreis(e.target.value)}
                            required
                        />{" "}
                        Euro
                    </div>
                </div>
                <div className="form-group">
                    <label>Zustand:</label>
                    <select value={zustand} onChange={(e) => setZustand(e.target.value)}>
                        {ZUSTAND_ENUM.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Marke:</label>
                    <input
                        type="text"
                        value={marke}
                        onChange={(e) => setMarke(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Kategorie:</label>
                    <select
                        value={kategorie}
                        onChange={(e) => setKategorie(e.target.value)}
                    >
                        {KATEGORIE_ENUM.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Bild auswählen:</label>
                    <input
                        type="file"
                        onChange={(e) => setImgFile(e.target.files[0])}
                    />
                </div>
                {imgUrl && (
                    <div className="form-group">
                        <label>Aktuelles Bild:</label>
                        <img src={imgUrl} alt="Aktuelles Produkt" style={{ maxWidth: '30%' }} />
                    </div>
                )}
                <button type="submit" className="submit-button">
                    aktualisieren
                </button>
                <ToastContainer />
            </form>
        </div>
    );
}