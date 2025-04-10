import React, { useState, useEffect } from "react";
import axios from "axios";

const AddressList = ({ onEdit, isAddNew, isEditNew }) => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
  
      axios
      .get("https://my-backend-coral-eight.vercel.app/addresses")
      .then((response) => setAddresses(response.data))
      .catch((error) => console.error("Error fetching addresses:", error));
  
  }, [isAddNew, isEditNew]);

  const handleDelete = (id) => {
    axios
      .delete(`https://my-backend-coral-eight.vercel.app/addresses/${id}`)
      .then(() => {
        setAddresses(addresses.filter((address) => address.id !== id));
      })
      .catch((error) => console.error("Error deleting address:", error));
  };

  return (
    <div>
      <h2>Address List</h2>
      {addresses.map((address) => (
        <div
          key={address.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          <h4>House Number: {address.house_num}</h4>
          <p>Street: {address.street}</p>
          <p>Country: {address.country}</p>
          <button onClick={() => onEdit(address)}>Edit</button>
          <button onClick={() => handleDelete(address.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AddressList;
