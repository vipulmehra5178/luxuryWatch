import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWatchById } from "../server/api";
import { useCart } from '../context/CartContext';

const WatchDetail = () => {
  const [watch, setWatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
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

    fetchWatchDetails();
  }, [id]);

  const handleAddToCart = () => {
    const cartItem = {
      id: watch._id,  
      title: watch.title,
      price: watch.price,
      image: watch.images[0],
      quantity: quantity,
      shippingCharge: watch.shipping.charges,
      totalPrice: (watch.price * quantity) + watch.shipping.charges
    };

    addToCart(cartItem, quantity);
    alert('Added to cart successfully!');
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
          
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "2rem", color: "#2c2c2c" }}>₹{watch.price}</h2>
            {watch.discount > 0 && (
              <p style={{ backgroundColor: "#ff4444", color: "white", padding: "8px 16px", borderRadius: "20px", fontSize: "1.1rem" }}>
                {watch.discount}% OFF
              </p>
            )}
          </div>

          <div style={{ 
            marginTop: "20px",
            marginBottom: "30px",
            padding: "20px",
            backgroundColor: "#f8f8f8",
            borderRadius: "8px"
          }}>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "20px",
              marginBottom: "20px" 
            }}>
              <label htmlFor="quantity" style={{ fontSize: "1.1rem", fontWeight: "600" }}>
                Quantity:
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  style={{
                    padding: "5px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    backgroundColor: "#fff",
                    cursor: "pointer"
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  style={{
                    width: "60px",
                    padding: "5px",
                    textAlign: "center",
                    border: "1px solid #ddd",
                    borderRadius: "4px"
                  }}
                />
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  style={{
                    padding: "5px 12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    backgroundColor: "#fff",
                    cursor: "pointer"
                  }}
                >
                  +
                </button>
              </div>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <p style={{ fontSize: "1.1rem", marginBottom: "10px" }}>
                <strong>Shipping Charge:</strong> ₹{watch.shipping.charges}
              </p>
              <p style={{ fontSize: "1.2rem", color: "#2c2c2c" }}>
                <strong>Total Price:</strong> ₹{(watch.price * quantity) + watch.shipping.charges}
              </p>
            </div>

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
                transition: "background-color 0.2s",
                ":hover": {
                  backgroundColor: "#0056b3"
                }
              }}
            >
              Add to Cart
            </button>
          </div>

          <p style={{ fontSize: "1.2rem", marginBottom: "15px" }}><strong>Brand:</strong> {watch.brand}</p>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "30px", color: "#444" }}>{watch.description}</p>

          <div className="technical-specs" style={{ marginBottom: "30px" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>Technical Specifications</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "10px" }}><strong>Dial Size:</strong> {watch.technical_specs.dial_size}</li>
              <li style={{ marginBottom: "10px" }}><strong>Strap Material:</strong> {watch.technical_specs.strap_material}</li>
              <li style={{ marginBottom: "10px" }}><strong>Water Resistance:</strong> {watch.technical_specs.water_resistance}</li>
              <li style={{ marginBottom: "10px" }}><strong>Movement Type:</strong> {watch.technical_specs.movement_type}</li>
              <li style={{ marginBottom: "10px" }}><strong>Battery Life:</strong> {watch.technical_specs.battery_life}</li>
            </ul>

            <h4 style={{ fontSize: "1.3rem", marginTop: "20px", marginBottom: "15px" }}>Features</h4>
            <ul style={{ paddingLeft: "20px" }}>
              {watch.technical_specs.features.map((feature, index) => (
                <li key={index} style={{ marginBottom: "8px" }}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="additional-info" style={{ marginBottom: "30px", padding: "20px", backgroundColor: "#f8f8f8", borderRadius: "8px" }}>
            <p style={{ marginBottom: "8px" }}><strong>SKU:</strong> {watch.sku}</p>
            <p style={{ marginBottom: "8px" }}><strong>Manufacturer:</strong> {watch.manufacturer}</p>
            <p style={{ marginBottom: "8px" }}><strong>Country of Origin:</strong> {watch.country_of_origin}</p>
            <p style={{ marginBottom: "8px" }}><strong>Warranty:</strong> {watch.warranty_period}</p>
            <p style={{ marginBottom: "8px" }}><strong>Rating:</strong> {watch.rating} / 5</p>
            <p><strong>Stock:</strong> {watch.inventory.quantity_in_stock} units</p>
          </div>

          <div className="shipping-info" style={{ marginBottom: "30px", padding: "20px", backgroundColor: "#f8f8f8", borderRadius: "8px" }}>
            <h3 style={{ fontSize: "1.3rem", marginBottom: "15px" }}>Shipping Information</h3>
            <p style={{ marginBottom: "8px" }}><strong>Delivery Time:</strong> {watch.shipping.delivery_time}</p>
            <p style={{ marginBottom: "8px" }}><strong>Shipping Charge:</strong> ₹{watch.shipping.charges}</p>
            <p><strong>Available Options:</strong> {watch.shipping.options.join(", ")}</p>
          </div>

          {watch.reviews.length > 0 && (
            <div className="reviews">
              <h3 style={{ fontSize: "1.3rem", marginBottom: "20px" }}>Customer Reviews</h3>
              {watch.reviews.map((review, index) => (
                <div key={index} style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f8f8f8", borderRadius: "8px" }}>
                  <p style={{ fontWeight: "600", marginBottom: "8px" }}>{review.user_name}</p>
                  <p style={{ color: "#666", marginBottom: "8px" }}>Rating: {review.rating}/5</p>
                  <p style={{ lineHeight: "1.5" }}>{review.user_comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchDetail;
