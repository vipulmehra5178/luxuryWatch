import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getWatchById } from "../server/api";
import { useCart } from "../context/CartContext";

const WatchDetail = () => {
  const { id } = useParams();   
  const { addToCart } = useCart();

  const [watch, setWatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWatchDetails = async () => {
      try {
        const data = await getWatchById(id);  
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
    if (!watch) return;

    const cartItem = {
      id: watch._id,   
      title: watch.title,
      price: watch.price,
      image: watch.images?.[0],
      quantity,
      shippingCharge: watch.shipping?.charges || 0,
      totalPrice:
        watch.price * quantity +
        (watch.shipping?.charges || 0),
    };

    addToCart(cartItem);
    alert("Added to cart successfully!");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!watch) return <div>Watch not found</div>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>{watch.title}</h1>

      <img
        src={watch.images?.[0]}
        alt={watch.title}
        style={{ width: "400px", borderRadius: "10px" }}
      />

      <h2>₹{watch.price}</h2>

      {watch.discount > 0 && (
        <p>{watch.discount}% OFF</p>
      )}

      <p><strong>Brand:</strong> {watch.brand}</p>
      <p>{watch.description}</p>

      <div>
        <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>-</button>
        <span style={{ margin: "0 10px" }}>{quantity}</span>
        <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
      </div>

      <button
        onClick={handleAddToCart}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "6px"
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default WatchDetail;
