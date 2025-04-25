// pages/api/chat.js
export default async function handler(req, res) {
    const { message } = req.body;
  
    if (message.toLowerCase().includes("show products")) {
      const productsRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`);
      const products = await productsRes.json();
  
      const names = products.map(p => p.name).join(", ");
      return res.json({ reply: `Here are some products: ${names}` });
    }
  
    if (message.toLowerCase().includes("make order")) {
      return res.json({
        reply: "Sure! Please provide your first name, last name, phone, address, and delivery type (delivery or onstore)."
      });
    }

    if (message.toLowerCase().includes("order:")) {
      const [, payload] = message.split("order:");
      const parsed = JSON.parse(payload); // Assume JSON format from chatbot
    
      const orderData = {
        cartItems: {
          fname: parsed.fname,
          lname: parsed.lname,
          phone: parsed.phone,
          address: parsed.address,
          deliveryType: parsed.deliveryType
        },
        userInfo: parsed.items, // Array of items
        total: parsed.total,
        delivery: parsed.deliveryType
      };
    
      const orderRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/sendOrder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
    
      if (orderRes.ok) {
        return res.json({ reply: "Your order has been placed successfully!" });
      } else {
        return res.json({ reply: "There was an error placing your order." });
      }
    }
    
  
    // Dummy fallback
    return res.json({ reply: `You said: "${message}". How can I help you more?` });
  }
  