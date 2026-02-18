import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWatchById } from "../server/api";
import { useCart } from "../context/CartContext";

const WatchDetail = () => {
  const { id } = useParams();   
  const [watch, setWatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchWatchDetails = async () => {
      try {
        const data = await getWatchById(id);  
        console.log(data);
        setWatch(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWatchDetails();
    }
  }, [id]);   

  const handleAddToCart = () => {
    const cartItem = {
      id: watch._id,   
      title: watch.title,
      price: watch.price,
      image: watch.images[0],
      quantity: quantity,
      shippingCharge: watch.shipping.charges,
      totalPrice:
        watch.price * quantity + watch.shipping.charges,
    };

    addToCart(cartItem, quantity);
    alert("Added to cart successfully!");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!watch) return <div>Watch not found</div>;

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
        <div className="watch-images" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {watch.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${watch.title} - View ${index + 1}`}
              style={{ width: "100%", height: "auto", borderRadius: "8px" }}
            />
          ))}
        </div>

        <div className="watch-info" style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "20px", color: "#1a1a1a" }}>{watch.title}</h1>

          <h2 style={{ fontSize: "2rem", color: "#2c2c2c" }}>₹{watch.price}</h2>

          <button
            onClick={handleAddToCart}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "12px 24px",
              border: "none",
              borderRadius: "6px",
              fontSize: "1.1rem",
              cursor: "pointer",
              width: "100%",
              marginTop: "20px"
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchDetail;
