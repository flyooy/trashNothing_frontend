import React, { useState, useEffect } from "react";
import "./css/Marktplatz.css";
import { useNavigate } from "react-router-dom";
const ZUSTAND = ["NEU", "WIE_NEU", "GEBRAUCHSSPUREN"];
const KATEGORIE = ["KLEIDUNG", "MOEBEL", "SPIELZEUG"];

export default function WishListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedZustand, setSelectedZustand] = useState([]);
  const [selectedKategorie, setSelectedKategorie] = useState([]);
  const [deliveryOption, setDeliveryOption] = useState(false);
  const [pickupOption, setPickupOption] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const navigate = useNavigate();
  const fetchProducts = async () => {
    const benutzerId = localStorage.getItem("benutzerId");
    if (!benutzerId) {
      console.error("Benutzer ID is not found in localStorage");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/product/AddToWishlist/user/${benutzerId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

if (!Array.isArray(data)) {
    console.error("Received data is not an array:", data);
    return;
}
      console.log("API response:", data);
      data.forEach(product => {
        console.log("Product ID:", product.produktId);
      });
      setAllProducts(data || []);
      setProducts(data || []);
    
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const removeFromWishlist = async (wunschSetId) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/product/removeWishlist/${wunschSetId}`, {
            method: 'DELETE',
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                
            },
        });

        if (!response.ok) {
            throw new Error("Failed to remove from wishlist");
        }

        console.log(`WunschSet with ID ${wunschSetId} removed from wishlist`);
      fetchProducts();
      console.log("Product ID:", product.produktId);
    } catch (error) {
        console.error("Error removing from wishlist:", error);
    }
};

  const handleZustandChange = (zustand) => {
    setSelectedZustand((prev) =>
      prev.includes(zustand)
        ? prev.filter((item) => item !== zustand)
        : [...prev, zustand]
    );
  };

  const handleKategorieChange = (kategorie) => {
    setSelectedKategorie((prev) =>
      prev.includes(kategorie)
        ? prev.filter((item) => item !== kategorie)
        : [...prev, kategorie]
    );
  };
  const handleSearch = async () => {
    let url = "http://localhost:8080/api/v1/produkte/search";

    const terms = searchTerm.split(" ");
    const titleParam = terms[0];
    const kategorieParam = terms.length > 1 ? terms[1] : "";

    const titleQuery = titleParam
      ? `title=${encodeURIComponent(titleParam)}`
      : "";
    const kategorieQuery =
      kategorieParam && KATEGORIE.includes(kategorieParam)
        ? `kategorie=${encodeURIComponent(kategorieParam)}`
        : "";

    const params = [titleQuery, kategorieQuery].filter(Boolean).join("&");
    if (params) {
      url += `?${params}`;
    }

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(data); // 更新产品列表
    } catch (error) {
      console.error("Error fetching products:", error); // 错误处理
    }
  };

  const applyFilters = () => {
    const filteredProducts = allProducts.filter(
      (product) =>
        (selectedZustand.length === 0 ||
          selectedZustand.includes(product.zustand)) &&
        (selectedKategorie.length === 0 ||
          selectedKategorie.includes(product.kategorie)) &&
        ((!deliveryOption && !pickupOption) ||
          (deliveryOption && pickupOption) ||
          (deliveryOption && product.lieferung) ||
          (pickupOption && !product.lieferung)) &&
        (minPrice === "" || product.preis >= parseFloat(minPrice)) &&
        (maxPrice === "" || product.preis <= parseFloat(maxPrice))
    );
    setProducts(filteredProducts);
  };
  return (
    <>
      <section className="background_section_m">
        <h1 className="main_heading">Diese Artikel hättest du gerne</h1>
        
       
      </section>

      {/* <div className="product_listing_container">
        <aside className="sidebar">
          <h3>Kategorien</h3>
          <div className="checkbox_list">
            {KATEGORIE.map((kategorie, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  checked={selectedKategorie.includes(kategorie)}
                  onChange={() => handleKategorieChange(kategorie)}
                />
                {kategorie}
              </label>
            ))}
          </div>

          <h3>Zustand</h3>
          <div className="checkbox_list">
            {ZUSTAND.map((zustand, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  checked={selectedZustand.includes(zustand)}
                  onChange={() => handleZustandChange(zustand)}
                />
                {zustand}
              </label>
            ))}
          </div>
          <div className="checkbox_list">
            <h3>Delivery Options</h3>
            <label>
              <input
                type="checkbox"
                checked={deliveryOption}
                onChange={() => setDeliveryOption(!deliveryOption)}
              />
              Lieferung möglich
            </label>
            <label>
              <input
                type="checkbox"
                checked={pickupOption}
                onChange={() => setPickupOption(!pickupOption)}
              />
              Abholung
            </label>
          </div>
          <div className="checkbox_list,price_range">
            <h3>Preis</h3>
            <label>
              Min:
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min Preis"
                className="price_input"
              />
            </label>
            <label>
              Max:
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max Preis"
                className="price_input"
              />
            </label>
          </div>
          <button className="apply_button" onClick={applyFilters}>
            Anwenden
          </button>
          <button
            className="reset_button"
            onClick={() => setProducts(allProducts)}
          >
            Reset
          </button>
        </aside> */}

        <div className="product_listings_wishlist">
          {products.length > 0 ? (
           products.map((product, index) => (
            <div key={product.id || index} className="product_card">
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
                   
                   onClick={() =>
                     navigate(`/detailsproduct/${product.produktId}`)} 
                  >
                    Details
                  </button>
                  <button
                        className="remove_button,wishlist_label"
                        onClick={() => removeFromWishlist(product.wunschSetId)} 
                          >
                          Entfernen von WunschListe 🤍
                          </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no_products_message">Keine Produkte gefunden.</p>
          )}
        </div>
    
    </>
  );
}
