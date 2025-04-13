import React, { useState } from 'react';

const QuantitySelector = ({ initialQty, maxBoxes, onChange }) => {
  const [qty, setQty] = useState(initialQty);

  const handleChange = (e) => {
    let value = e.target.value;
    if (value) {
      value = parseInt(value, 10);
      setQty(value);
      onChange(value);
    }
  };

  return (
    <div className="quantity-selector">
      <select
        value={qty}
        onChange={handleChange}
        style={{ width: "60px", textAlign: "center", padding: "5px" }}
      >
        {/* Map directly to the values in the maxBoxes array */}
        {maxBoxes?.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default QuantitySelector;
