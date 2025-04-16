import React, { useState, useEffect } from "react";

const QuantitySelector = ({ initialQty = 1, productId, colorCode, onChange }) => {
  const [qty, setQty] = useState(initialQty);
  const [maxStock, setMaxStock] = useState(null);

  console.log("colorCode: ", colorCode);

  useEffect(() => {
    const fetchStock = async () => {
      if (!productId) return;

      const url = colorCode
        ? `/api/stock1/${colorCode}?productId=${productId}`
        : `/api/stock/${productId}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok && data.stock !== undefined) {
          setMaxStock(parseInt(data.stock, 10));
        } else {
          console.error("Failed to fetch stock:", data.error || "No stock returned");
        }
      } catch (error) {
        console.error("Error fetching stock:", error);
      }
    };

    fetchStock();
  }, [productId, colorCode]);

  const handleIncrement = () => {
    if (maxStock !== null && qty < maxStock) {
      const newQty = qty + 1;
      setQty(newQty);
      onChange(newQty);
    }
  };

  const handleDecrement = () => {
    if (qty > 1) {
      const newQty = qty - 1;
      setQty(newQty);
      onChange(newQty);
    }
  };

  useEffect(() => {
    setQty(initialQty);
  }, [initialQty, colorCode]);

  return (
    <div className="quantity-selector">
      <button
        className="myNewC"
        type="button"
        onClick={handleDecrement}
        style={{
          width: "20px",
          backgroundColor: "initial",
          marginRight: "5px",
          fontWeight: "900",
        }}
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
        style={{
          width: "20px",
          backgroundColor: "initial",
          marginLeft: "5px",
          fontWeight: "900",
        }}
        disabled={maxStock !== null && qty >= maxStock}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
