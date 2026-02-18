import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchWatches } from "../server/api";

const WatchList = () => {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWatches = async () => {
      try {
        setLoading(true);
        const data = await fetchWatches();
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received");
        }
        setWatches(data);
        setError(null);
      } catch (err) {
        console.error("Error details:", err);
        setError(err.message || "Failed to fetch watches");
        setWatches([]);
      } finally {
        setLoading(false);
      }
    };

    getWatches();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!watches.length) return <div>No watches found</div>;

  return (
    <div
      className="watch-list"
      style={{
        backgroundColor: "#f5f5f7",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#1a1a1a",
          fontSize: "2.5rem",
          marginBottom: "40px",
          fontWeight: "600",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Our Watches Collection
      </h1>

      <div
        className="watches-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
          padding: "20px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {watches.map((watch) => (
          <Link
            to={`/watch/${watch._id}`}  
            key={watch._id}           
            className="watch-card"
            style={{
              border: "none",
              borderRadius: "12px",
              padding: "20px",
              textDecoration: "none",
              color: "inherit",
              backgroundColor: "#fff",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "pointer",
            }}
          >
            <div
              className="watch-image"
              style={{
                width: "100%",
                height: "250px",
                overflow: "hidden",
                marginBottom: "15px",
                borderRadius: "8px",
              }}
            >
              <img
                src={
                  watch.images?.[0] ||
                  "https://via.placeholder.com/200x200?text=No+Image"
                }
                alt={watch.title}
                className="watch-thumbnail"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/200x200?text=Watch+Image+Not+Found";
                  e.target.onerror = null;
                }}
              />
            </div>

            <div className="watch-info">
              <h3
                style={{
                  margin: "10px 0",
                  fontSize: "1.4rem",
                  fontWeight: "600",
                  color: "#2c2c2c",
                }}
              >
                {watch.title}
              </h3>

              <p
                className="brand"
                style={{
                  color: "#666",
                  fontSize: "1.1rem",
                  fontWeight: "500",
                  marginBottom: "15px",
                }}
              >
                {watch.brand}
              </p>

              <div
                className="price-section"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  margin: "15px 0",
                }}
              >
                <span
                  className="price"
                  style={{
                    fontWeight: "700",
                    fontSize: "1.3rem",
                    color: "#2c2c2c",
                  }}
                >
                  ₹{watch.price}
                </span>

                {watch.discount > 0 && (
                  <span
                    className="discount"
                    style={{
                      backgroundColor: "#ff4444",
                      color: "white",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {watch.discount}% OFF
                  </span>
                )}
              </div>

              <div
                className="gender-info"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  color: "#666",
                  fontSize: "0.95rem",
                  fontWeight: "500",
                  textTransform: "capitalize",
                }}
              >
                <span>{watch.gender}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WatchList;
