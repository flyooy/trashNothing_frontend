import React, { useState, useEffect } from "react";
import "./css/Marktplatz.css";
import { useNavigate } from "react-router-dom";

export default function Gekauftlist() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchGekauftProducts = async () => {
        const benutzerId = localStorage.getItem("benutzerId");
        if (!benutzerId) {
            console.error("Benutzer ID is not found in localStorage");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/v1/produkte/gekauft/${benutzerId}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });

            if (!response.ok) {

                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            setProducts(data || []);
        } catch (error) {
            console.error("Error fetching purchased products:", error);
            setError("Fehler beim Laden der gekauften Produkte."); // 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGekauftProducts();
    }, []);

    if (loading) {
        return <p className="loading_message">Lade deine gekauften Produkte...</p>;
    }

    return (
        <>
            <section className="background_section_m">
                <h1 className="main_heading">Deine gekauften Artikel</h1>
            </section>

            <div className="product_listings_wishlist">
                {error ? (
                    <p className="error_message">{error}</p>
                ) : products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="product_card">
                            <img
                                src={product.imgUrl}
                                alt={product.titel}
                                className="product_image"
                            />
                            <div className="product_info">
                                <h4 className="product_price">
                                    {product.preis.toFixed(2)} EUR
                                </h4>
                                <p className="product_title">{product.titel}</p>
                                <p className="product_details">{product.beschreibung}</p>
                                <p className="product_location">
                                    {product.lieferung ? "Lieferung möglich" : "Abholung"}
                                </p>
                            </div>
                            <div className="product_actions">
                                <button
                                    className="details_button"
                                    onClick={() => navigate(`/detailsproduct/${product.id}`)}
                                >
                                    Details
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no_products_message">Keine gekauften Produkte gefunden.</p>
                )}
            </div>
        </>
    );
}