import { useState } from "react";
import AddAddress from "./components/AddAddress";
import EditAddress from "./components/EditAddress";
import AddressList from "./components/AddressList";
import "./App.css";

function App() {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [isAddNew, setIsAddNew] = useState(false);
  const [isEditNew, setIsEditNew] = useState(false);

  const handleAddAddress = (newAddress) => {
    setAddresses([...addresses, newAddress]);
    setIsAddNew(newAddress);
  };

  const handleUpdateAddress = (updatedAddress) => {
    setAddresses(
      addresses.map((address) =>
        address.id === updatedAddress.id ? updatedAddress : address
      )
    );
    setSelectedAddress(null);
    setIsEditNew(updatedAddress);
  };

  return (
    <div>
      <h1>React Address Book</h1>
      <AddAddress onAdd={handleAddAddress} setIsAddNew={handleAddAddress}/>
      <EditAddress selectedAddress={selectedAddress} onUpdate={handleUpdateAddress} />
      <AddressList onEdit={setSelectedAddress} isAddNew={isAddNew} isEditNew={isEditNew}/>
    </div>
  );
}

export default App;
