"use client";
import { useCart } from '../app/context/CartContext'; 
import { useState } from 'react';

const WhatsAppButton = ({ inputs, items, total, delivery }) => {
    const { cart, removeFromCart, updateQuantity, clearCart, isModalOpen, toggleModal ,subtotal} = useCart();
    const [error, setError] = useState(null); 
 
    const createOrder = async () => {
        try {
            let earnedPoints = 0;
    
            for (const item of items) {
                const quantityToDecrease = parseInt(item.quantity, 10);
                earnedPoints += parseInt(item.points || 0) * quantityToDecrease; 
            }
    
            const orderResponse = await fetch("/api/sendOrder", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items,
                    inputs,
                    total,
                    delivery,
                }),
            });
    
            if (!orderResponse.ok) throw new Error("Failed to create order");
    
            console.log("Order created successfully!");
    
 
            const currentPoints = parseInt(localStorage.getItem("userPoints") || "0");
            const newTotalPoints = currentPoints + earnedPoints;
            localStorage.setItem("userPoints", newTotalPoints); 
            alert("Order placed successfully!");
    
        } catch (error) {
            console.error("Error processing order:", error);
            alert(error.message || "Something went wrong");
        }
    };
    
    
    
    

    const handleClick = async () => {
        if (!validateInputs(inputs)) {
            setError('Please filll the required fields.');
            return;
        }

        const url = createWhatsAppURL(inputs, items , total, delivery, subtotal);
        window.open(url, '_blank');
        createOrder();
        clearCart();
        setError(null);
    };

    const validateInputs = (inputs) => {
        const { address, fname, lname, phone } = inputs;
        return address && fname && lname && phone ;
    };

    return (
        <div className='container'>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <span className="ProvidersSingleProduct--selected">
                <button onClick={handleClick} type="button" className="AddToCart HtmlProductAddToCart" style={{ borderRadius: "0" }}  >
                    <span>Order Now!</span>
                </button>
            </span> 
        </div>
    );
};

export default WhatsAppButton;

const createWhatsAppURL = (inputs, items, total, delivery, subtotal) => { 
    const { address, fname, lname, phone, email, note, deliveryType } = inputs;
  
 
  
    // Formatting the message
    const message = `
  *Customer Information:*
  Email: ${email}
  Name: ${fname} ${lname}
  Phone: ${phone}
  Address: ${address}
  Note: ${note}
  
  *Order Details:*
  ${items.map((item, index) => `
  Item ${index + 1}:
  - Name: ${item.title}
  - Quantity: ${item.quantity} 
  - Sizes:
  ${item.selectedSizes?.map(size => `   - Size: ${size.size}, Qty: ${size.qty}, Price: $${size.price}`).join('\n') || '   - N/A'}
  - Options:
  ${item.selectedNames?.map(name => `   - Name: ${name.name}, Qty: ${name.qty}`).join('\n') || '   - N/A'}
  - Image: ${item.img?.[0] || 'N/A'}
  `).join('\n')}
  
  Subtotal: $${subtotal}
  Delivery Type: ${deliveryType}
  Delivery fee: $${delivery}
  *Total Amount:* $${total}
  `;
  
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '96178850249';
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };
  
