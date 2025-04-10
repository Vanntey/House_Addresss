import React, { useState } from "react";
import axios from "axios";

const AddAddress = ({ onAdd, setIsAddNew }) => {
  const [houseNum, setHouseNum] = useState("");
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://my-backend-coral-eight.vercel.app/addresses", {
        house_num: houseNum,
        street,
        country,
        userId: 1,
      })
      .then((response) => {
        onAdd(response.data);
        setHouseNum("");
        setStreet("");
        setCountry("");
        setIsAddNew(true);
      })
      .catch((error) => console.error("Error adding address:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Address</h2>
      <input
        type="text"
        value={houseNum}
        placeholder="House Number"
        onChange={(e) => setHouseNum(e.target.value)}
        required
      />
      <input
        type="text"
        value={street}
        placeholder="Street"
        onChange={(e) => setStreet(e.target.value)}
        required
      />
      <input
        type="text"
        value={country}
        placeholder="Country"
        onChange={(e) => setCountry(e.target.value)}
        required
      />
      <button type="submit">Add Address</button>
    </form>
  );
};

export default AddAddress;
