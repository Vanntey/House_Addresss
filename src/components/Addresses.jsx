import React, { useState, useEffect } from "react";
import axios from "axios";

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [houseNum, setHouseNum] = useState("");
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("USA");

  // Fetch addresses from JSON Server
  useEffect(() => {
    axios
      .get("https://my-backend-coral-eight.vercel.app/addresses")
      .then((response) => setAddresses(response.data))
      .catch((error) => console.error("Error fetching addresses:", error));
  }, []);

  // Add a new address
  const addAddress = (e) => {
    e.preventDefault();
    axios
      .post("https://my-backend-coral-eight.vercel.app/addresses", {
        house_num: houseNum,
        street,
        country,
      })
      .then((response) => {
        setAddresses([...addresses, response.data]);
        setHouseNum("");
        setStreet("");
        setCountry("USA");
      })
      .catch((error) => console.error("Error adding address:", error));
  };

  return (
    <div>
      <h1>React Address App</h1>

      {/* Add Address Form */}
      <form onSubmit={addAddress}>
        <input
          type="number"
          placeholder="House Number"
          value={houseNum}
          onChange={(e) => setHouseNum(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          required
        />
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        >
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
          <option value="UK">UK</option>
          <option value="Germany">Germany</option>
          <option value="Australia">Australia</option>
        </select>
        <button type="submit">Add Address</button>
      </form>

      {/* Display Addresses */}
      <h2>Addresses</h2>
      {addresses.map((addr) => (
        <div
          key={addr.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          <p>
            <strong>House Number:</strong> {addr.house_num}
          </p>
          <p>
            <strong>Street:</strong> {addr.street}
          </p>
          <p>
            <strong>Country:</strong> {addr.country}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Addresses;
