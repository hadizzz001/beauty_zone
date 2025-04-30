import React, { useState, useEffect } from "react";

const QuantitySelector = ({ initialQty = 1, productId, onChange }) => {
  const [qty, setQty] = useState(initialQty);
  const [maxStock, setMaxStock] = useState(null); // Store max stock

 

  const handleIncrement = () => {
     
      setQty(qty + 1);
      onChange(qty + 1); 
  };

  const handleDecrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
      onChange(qty - 1);
    }
  };

  return (
    <div className="quantity-selector">
      <button 
        className="myNewC" 
        type="button" 
        onClick={handleDecrement} 
        style={{ width: "20px", backgroundColor: "initial", marginRight: "5px", fontWeight: "900" }}
      >
        -
      </button>
      <input 
        type="number" 
        value={qty} 
        readOnly 
        style={{ width: "30px", color: "initial" }} 
      />
      <button 
        className="myNewC" 
        type="button" 
        onClick={handleIncrement} 
        style={{ width: "20px", backgroundColor: "initial", marginLeft: "5px", fontWeight: "900" }} 
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
