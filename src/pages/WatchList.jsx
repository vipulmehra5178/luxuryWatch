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
        const data = await fetchWatches();
        setWatches(data);
      } catch (err) {
        setError(err.message || "Failed to fetch watches");
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
    <div style={{ padding: "40px" }}>
      <h1>Our Watches Collection</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "30px"
      }}>
        {watches.map((watch) => (
          <Link
            to={`/watch/${watch._id}`}   
            key={watch._id}
            style={{
              textDecoration: "none",
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
            }}
          >
            <img
              src={watch.images?.[0]}
              alt={watch.title}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />

            <h3>{watch.title}</h3>
            <p>{watch.brand}</p>
            <h4>₹{watch.price}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WatchList;
