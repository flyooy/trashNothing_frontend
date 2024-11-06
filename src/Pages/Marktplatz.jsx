import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Marktplatz.css";

const ZUSTAND = { "Neu": "NEU", "Wie neu": "WIE_NEU", "Gebrauchsspuren": "GEBRAUCHSSPUREN" };
const KATEGORIE = {
  "Kleidung": "KLEIDUNG",
  "Möbel": "MOEBEL",
  "Spielzeug": "SPIELZEUG"
};


export default function Marktplatz() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedZustand, setSelectedZustand] = useState([]);
  const [selectedKategorie, setSelectedKategorie] = useState([]);
  const [deliveryOption, setDeliveryOption] = useState(false);
  const [pickupOption, setPickupOption] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const fetchProducts = async () => {
    try {
      const headers = {};
      const token = localStorage.getItem("token");
      if (token) {
        headers["Authorization"] = "Bearer " + token;
      }

      const response = await fetch("http://localhost:8080/api/v1/produkte", { headers });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAllProducts(data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchWishlistProducts = async () => {
    const benutzerId = localStorage.getItem("benutzerId");
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    console.log("Benutzer ID:", benutzerId);
    if (!benutzerId || !token) {
      console.error("User ID or token is missing in localStorage");
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

      const wishlistData = await response.json();
      setWishlistProducts(wishlistData || []);
      console.log("Wishlist Products:", wishlistData);
      wishlistData.forEach((product, index) => {
        console.log(`Wishlist Product ${index + 1}:`, product);
      });
    } catch (error) {
      console.error("Error fetching wishlist products:", error);
    }
  };
  const isProductInWishlist = (productId) => {
    const inWishlist = wishlistProducts.some((product) => product.produktId === productId);
    console.log(`Is product ID ${productId} in wishlist?`, inWishlist);
    return inWishlist;
  };
  const addToWishlist = async (productId) => {
    const benutzerId = localStorage.getItem("benutzerId");
    console.log("Attempting to add product with ID:", productId);

    if (isProductInWishlist(productId)) {
      console.log("Product is already in wishlist");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/product/addToWishlist/${productId}`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ benutzerId }),
        }
      );

      if (!response.ok) {
        throw new Error("Error adding product to wishlist");
      }


      const newProduct = await response.json();


      setWishlistProducts((prev) => [...prev, newProduct]);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };



  useEffect(() => {
    fetchProducts();
    fetchWishlistProducts();
  }, []);
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
        <h1 className="main_heading">Hilf mit die Umwelt zu schützen</h1>
        <p className="sub_text">
          Abfälle bedrohen Vögel, Delfine und Co. Mehr als zehn Millionen Tonnen
          Abfälle gelangen jährlich in die Ozeane. Sie kosten Abertausende
          Meerestiere das Leben. Seevögel verwechseln Plastik mit natürlicher
          Nahrung. Delfine verfangen sich in alten Fischernetzen. Hilf mit Müll
          zu reduzieren und trashnothing.
        </p>
        <div className="search_area">
          {token && ( 
            <>
            <input
                type="text"
                placeholder="Suche nach Produkt..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search_input"
              />
               <button className="post_button" onClick={handleSearch}>
                    Suchen
                </button>
              </>
        )}
          
        </div>
      </section>

      <div className="product_listing_container">
        <aside className="sidebar">
          <h3>Kategorien</h3>
          <div className="checkbox_list">
            {Object.keys(KATEGORIE).map((displayName, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  checked={selectedKategorie.includes(KATEGORIE[displayName])}
                  onChange={() => handleKategorieChange(KATEGORIE[displayName])}
                />
                {displayName}
              </label>
            ))}
          </div>

          <h3>Zustand</h3>
          <div className="checkbox_list">
            {Object.keys(ZUSTAND).map((displayName, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  checked={selectedZustand.includes(ZUSTAND[displayName])}
                  onChange={() => handleZustandChange(ZUSTAND[displayName])}
                />
                {displayName}
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
        </aside>

        <div className="product_listings">
          {products.length > 0 ? (
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
                            <p className="product_location">Zustand: {product.zustand}</p>
                            <p className="product_location">Marke: {product.marke}</p>
                  <p className="product_details">{product.beschreibung}</p>
                 
                  <p className="product_location">
                    {product.lieferung ? "Lieferung möglich" : "Abholung"}
                  </p>
                </div>
                <div className="product_actions">
                  {token && ( 
                    <>
                  <button
                    className="details_button"
                    onClick={() => navigate(`/detailsproduct/${product.id}`)}
                  >
                    Details
                  </button>
                  <label className="wishlist_label">
                    {!isProductInWishlist(product.id) ? (
                      <button onClick={() => addToWishlist(product.id)}>
                        Auf WunschListe ❤️
                      </button>
                    ) : (
                      <span></span>
                    )}
                      </label>
                      </>
                    )}
                </div>
                  
              </div>
            ))
          ) : (
            <p className="no_products_message">Keine Produkte gefunden.</p>
          )}
        </div>
      </div>
    </>
  );
}
