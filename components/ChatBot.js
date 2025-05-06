
"use client";
import { useState, useRef, useEffect } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([ 
    {
      from: "bot",
      text: `Hi! Ask me about products or place an order.\nor type category\nor type subcategory\nor type brand`,
    },
  ]);
  
  const [input, setInput] = useState("");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [step, setStep] = useState("");
  const [showChat, setShowChat] = useState(true);
  const [userInfo, setUserInfo] = useState({
    fname: "",
    lname: "",
    phone: "",
    address: "",
    deliveryType: "",
  });

  const toggleChat = () => setIsOpen(!isOpen);
  const messagesEndRef = useRef(null);


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChat(false);
    }, 6000); // 6 seconds

    return () => clearTimeout(timer); // clean up the timer if the component unmounts
  }, []);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const sendMessageInput = (text) => {
    setMessages((prev) => [...prev, { from: "user", text }]);
    handleMessage(text);
  };






  const sendMessage = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages((prev) => [...prev, { from: "user", text: userText }]);
    setInput("");
    handleMessage(userText);
  };

  const handleMessage = async (userText) => {
    if (step === "chooseName") {
      const nameChosen = currentProduct?.product?.names?.find((n) => n.toLowerCase() === userText.toLowerCase());

      if (!nameChosen) {
        return setMessages((m) => [...m, { from: "bot", text: "❌ Invalid choice. Please select one of the listed options." }]);
      }

      setCurrentProduct((prev) => ({ ...prev, selectedName: nameChosen }));
      setStep("quantity");
      return setMessages((m) => [...m, { from: "bot", text: "How many do you want?" }]);
    }

    if (step === "chooseSize") {
      const sizeChosen = currentProduct?.product?.sizes?.find(
        (s) => s.size.toLowerCase() === userText.toLowerCase()
      );

      if (!sizeChosen) {
        return setMessages((m) => [
          ...m,
          { from: "bot", text: "❌ Invalid size. Please select one of the listed sizes." },
        ]);
      }

      setCurrentProduct((prev) => ({
        ...prev,
        selectedSize: sizeChosen.size,
        selectedPrice: sizeChosen.price,
      }));

      setStep("quantity");
      return setMessages((m) => [...m, { from: "bot", text: "How many do you want?" }]);
    }

    if (step === "quantity") {
      const quantity = parseInt(userText) || 1;
      const updatedProduct = { ...currentProduct, quantity };

      setCurrentProduct(updatedProduct); 
      const completed = { ...updatedProduct };
      setCart((c) => [...c, completed]);
      setCurrentProduct(null);
      setStep("confirmAnotherProduct");
      return setMessages((m) => [
        ...m,
        { from: "bot", text: "✅ Added! Do you want to add another product?" },
      ]);
    }





    if (step === "confirmAnotherProduct") {
      if (userText.toLowerCase() === "yes") {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
        setMessages((m) => [...m, { from: "bot", text: "🛍️ Choose a product:" }]);
        return;
      } else {
        setStep("name");
        return setMessages((m) => [...m, { from: "bot", text: "🧍 What's your full name?" }]);
      }
    }


    if (step === "name") {
      const [fname, ...lnameParts] = userText.split(" ");
      const lname = lnameParts.join(" ") || "";
      setUserInfo((u) => ({ ...u, fname, lname }));
      setStep("phone");
      return setMessages((m) => [...m, { from: "bot", text: "📞 Your phone number?" }]);
    }

    if (step === "phone") {
      setUserInfo((u) => ({ ...u, phone: userText }));
      setStep("address");
      return setMessages((m) => [...m, { from: "bot", text: "🏠 Your address?" }]);
    }

    if (step === "address") {
      setUserInfo((u) => ({ ...u, address: userText }));
      setStep("delivery");
      return setMessages((m) => [
        ...m,
        { from: "bot", text: "🚚 Choose delivery type below." },
      ]);
    }


    const lowerText = userText.toLowerCase().trim();

    if (userText.toLowerCase().startsWith("product =")) {
      const searchTerm = userText.split("=").pop().trim().toLowerCase();
      const res = await fetch("/api/products");
      const data = await res.json();
      const filtered = data.filter(p => p.title.toLowerCase().includes(searchTerm));

      if (filtered.length > 0) {
        setProducts(filtered);
        setMessages((m) => [...m, { from: "bot", text: `🔍 Found products matching "${searchTerm}". Choose a product:` }]);
      } else {
        setMessages((m) => [...m, { from: "bot", text: `❌ No products found matching "${searchTerm}".` }]);
      }
      return;
    }




    if (lowerText === "category") {
      const res = await fetch("/api/category");
      const data = await res.json();
      const categories = data?.map((c) => `• ${c.name}`).join("\n") || "No categories found.";
      return setMessages((m) => [
        ...m,
        { from: "bot", text: `📂 Categories:\n${categories}` },
      ]);
    }

    if (lowerText === "brand") {
      const res = await fetch("/api/brand");
      const data = await res.json();
      const brands = data?.map((b) => `• ${b.name}`).join("\n") || "No brands found.";
      return setMessages((m) => [
        ...m,
        { from: "bot", text: `🏷️ Brands:\n${brands}` },
      ]);
    }

    if (lowerText === "subcategories") {
      const res = await fetch("/api/sub");
      const data = await res.json();
      const subs = data?.map((s) => `• ${s.name}`).join("\n") || "No subcategories found.";
      return setMessages((m) => [
        ...m,
        { from: "bot", text: `📁 Subcategories:\n${subs}` },
      ]);
    }

    const aiRes = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userText }),
    });
    if (!aiRes.ok) {
      // Optional: check HTTP status code
      console.error("Server returned an error:", aiRes.status);
      throw new Error("Failed to fetch");
    }
    const text = await aiRes.text();
    const data = text ? JSON.parse(text) : null;
    setMessages((m) => [...m, { from: "bot", text: data.message }]);
  };

  const selectProduct = (p) => {
    setCurrentProduct({ product: p });
    setProducts([]);

    if (p.names && p.names.some(name => name.trim() !== "")) {
      const nameOptions = p.names.map((n, i) => `• ${n}`).join("\n");
      setMessages((m) => [
        ...m,
        { from: "bot", text: `🛒 ${p.title} - $${p.discount}\nChoose one:\n${nameOptions}` },
      ]);
      setStep("chooseName");
    } else if (Array.isArray(p.sizes) && p.sizes.length > 0) {
      const sizeOptions = p.sizes.map((s, i) => `• ${s.size} - $${s.price}`).join("\n");
      setMessages((m) => [
        ...m,
        { from: "bot", text: `🛒 ${p.title}\nAvailable sizes:\n${sizeOptions}\nPlease choose a size:` },
      ]);
      setStep("chooseSize");
    } else {
      setMessages((m) => [
        ...m,
        { from: "bot", text: `🛒 ${p.title} - $${p.discount}\nHow many do you want?` },
      ]);
      setStep("quantity");
    }


  };

  return (
    <>
      {showChat && (
        <div className="fixed bottom-[150px] right-5 bg-white text-gray-700 p-2 rounded shadow z-50 text-sm" id="chat123">
          How can I assist you today?
        </div>
      )}
      <div onClick={toggleChat} className="fixed bottom-[80px] right-5 bg-[#5bbccd] text-white p-[18px] rounded-full cursor-pointer shadow-lg z-50">💬</div>

      {isOpen && (
        <div className="fixed bottom-[150px] right-5 w-80 max-h-[80vh] bg-white border rounded-lg shadow-xl flex flex-col z-50">
          <div className="overflow-y-auto flex-1 p-3 space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm p-2 rounded whitespace-pre-wrap ${m.from === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"}`}
              >
                {m.text}
              </div>
            ))}
            <div ref={messagesEndRef} />





            {step === "confirmAnotherProduct" && (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => sendMessageInput("yes")}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Yes
                </button>
                <button
                  onClick={() => sendMessageInput("no")}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  No
                </button>
              </div>
            )}


            {step === "delivery" && (
              <div className="space-y-2">
                <div className="text-sm text-gray-600" id="button111">🚚 Choose delivery type:</div>
                {["delivery", "onstore"].map((option) => (
                  <div
                    key={option}
                     id="button111"
                    onClick={async () => {
                      const deliveryType = option;
                      setUserInfo((u) => ({ ...u, deliveryType }));

                      const highestDelivery =
                        deliveryType === "delivery"
                          ? String(Math.max(...cart.map((c) => parseFloat(c.product.delivery || "0"))))
                          : "0";



                      const order = {
                        inputs: { ...userInfo, deliveryType },
                        items: cart.map((c) => ({
                          title: c.product.title,
                          discount: c.product.discount,
                          quantity: c.quantity,
                          img: c.product.img,
                          category: c.product.category,
                          subcategory: c.product.subcategory,
                          brand: c.product.brand,
                          selectedSizes: c.selectedSize
                          ? [{ size: c.selectedSize, price: c.selectedPrice, qty: c.quantity }]
                          : null,
                          selectedNames: c.selectedName
                            ? [{ name: c.selectedName, qty: c.quantity }]
                            : null,
                        })),

                        total: String(
                          cart.reduce((sum, p) => sum + p.quantity * parseFloat(p.product.discount), 0) + parseFloat(highestDelivery)
                        ),
                        delivery: highestDelivery,
                      };

                      const totalPoints = cart.reduce((points, c) => {
                        const productPoints = c.product.points || 0; // Handle case where product might not have points
                        return points + (productPoints * c.quantity);
                      }, 0);

                      // Update user points in localStorage
                      if (typeof window !== "undefined"){
                      const currentPoints = parseInt(localStorage.getItem("userPoints") || "0");
                      const newTotalPoints = currentPoints + totalPoints;
                      localStorage.setItem("userPoints", newTotalPoints);
                      }

                      await fetch("/api/sendOrder", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(order),
                      });

                      setMessages((m) => [
                        ...m,
                        { from: "user", text: option },
                        { from: "bot", text: "✅ Order placed! Thank you." },
                      ]);
                      setStep("");
                      setCart([]);
                    }}
                    className="p-2 border rounded cursor-pointer hover:bg-gray-100"
                  >
                    {option === "delivery" ? "🚚 Delivery" : "🏬 On Store Pickup"}
                  </div>
                ))}
              </div>
            )}


            {products?.length > 0 && products.map((p, i) => (
              <div key={i} onClick={() => selectProduct(p)} className="p-2 border rounded mb-2 cursor-pointer">
                <img src={p.img[0]} className=" object-cover rounded" />
                <p className="font-bold" id="button111">{p.title}</p>
                <p id="button111">${p.discount}</p>
              </div>
            ))}
          </div>

          <div className="flex border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 p-2 text-sm"
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} className="bg-blue-600 text-white px-4">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}