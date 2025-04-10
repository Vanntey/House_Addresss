import React, { useState, useEffect } from "react";
import axios from "axios";

const EditAddress = ({ selectedAddress, onUpdate, setIsEditNew }) => {
  const [houseNum, setHouseNum] = useState(selectedAddress?.house_num || "");
  const [street, setStreet] = useState(selectedAddress?.street || "");
  const [country, setCountry] = useState(selectedAddress?.country || "");

  useEffect(() => {
    setHouseNum(selectedAddress?.house_num || "");
    setStreet(selectedAddress?.street || "");
    setCountry(selectedAddress?.country || "");
  }, [selectedAddress]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://my-backend-coral-eight.vercel.app/addresses/${selectedAddress.id}`, {
        house_num: houseNum,
        street,
        country,
        userId: 1,
      })
      .then((response) => {
        onUpdate(response.data);
        setIsEditNew(true);
      })
      .catch((error) => console.error("Error updating address:", error));
  };

  return selectedAddress ? (
    <form onSubmit={handleSubmit}>
      <h2>Edit Address</h2>
      <input
        type="text"
        value={houseNum}
        onChange={(e) => setHouseNum(e.target.value)}
        required
        placeholder="House Number"
      />
      <input
        type="text"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        required
        placeholder="Street"
      />
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
        placeholder="Country"
      />
      <button type="submit">Update Address</button>
    </form>
  ) : null;
};

export default EditAddress;
