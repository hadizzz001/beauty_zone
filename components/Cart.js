import React, { useState, useEffect } from 'react';
import { useCart } from '../app/context/CartContext';
import { useBooleanValue } from '../app/context/CartBoolContext';

const Cart = () => {
    const { cart, removeFromCart, quantities, subtotal, addToCart } = useCart();
    const [localQuantities, setLocalQuantities] = useState(quantities);
    const { isBooleanValue, setBooleanValue } = useBooleanValue();
    const [errors, setErrors] = useState({});

    const handleRemoveFromCart = (itemId) => {
        removeFromCart(itemId);
    };

    const handleQuantityChange = (itemId, quantity) => {
        addToCart(
            cart.find((item) => item._id === itemId),
            undefined, // No additionalInfo update here
            quantity
        );

        // Update localQuantities immediately (local state)
        setLocalQuantities((prevQuantities) => ({
            ...prevQuantities,
            [itemId]: quantity,
        }));
    };

    useEffect(() => {
        // Update quantities in the context when localQuantities change
        setLocalQuantities(quantities);
    }, [quantities]);

    const handleClickc = () => {
        var cartb = document.getElementById("cartid");
        var cartb2 = document.getElementById("cartid2");
        setBooleanValue(!isBooleanValue);
        if (cartb && cartb2) {
            if (isBooleanValue) {
                cartb2.className += " MiniCart_Cart-visible";
            } else {
                cartb2.classList.remove("MiniCart_Cart-visible");
            }
        }
    };

    return (
        <>
            <div>
                <div className="MiniCart_Slider_Overlay" id='cartid' />
                <div className="MiniCart_Slider">
                    <div className="MiniCart_Slider_CloseButton">
                        <slot name="close-button" />
                    </div>
                    <slot />
                </div>
            </div>

            <template />
            <div className="Checkout">
                <div id='cartid2' className="MiniCart_Cart " style={{ zIndex: "99999999" }}>
                    <div className="MiniCart_Cart_Heading br_text-grey-500">
                        <a href="/checkout" className="MiniCart_CartIndicator">
                            <svg viewBox="0 0 31 28">
                                <circle cx={13} cy={24} r={2} />
                                <circle cx={24} cy={24} r={2} />
                                <path d="M1.5 2h3s1.5 0 2 2l4 13s.4 1 1 1h13s3.6-.3 4-4l1-5s0-1-2-1h-19" />
                            </svg>
                        </a>

                        <span>Your shopping cart</span>
                        <button
                            slot="close-button"
                            className="MiniCart_Cart_CloseButton"
                            aria-label="Close"
                            id='cartid'
                            style={{ zIndex: "99999999999" }}
                            onClick={handleClickc}
                        >
                            <div className="MiniCart_Cart_CloseButtonIcon" />
                        </button>
                    </div>

                    <div data-render-if="!cart-is-empty" className="MiniCart_Cart_CheckoutCart">
                        <div className="Checkout_Cart_Wrapper Checkout_Cart_Wrapper--All">
                            <div className="Checkout_Cart_TableHeading">
                                <span className="Checkout_Cart_TableHeading_Quantity">Qty</span>
                                <span className="Checkout_Cart_TableHeading_Total">Total price</span>
                            </div>
                            <div className="Checkout_Cart_LineItems">
                                {cart && cart.length > 0 ? (
                                    cart.map((obj, index) => (
                                        <div key={obj._id}>
                                            <div className="Checkout_Cart_LineItems_LineItem">
                                                <div className="Checkout_Cart_LineItems_LineItem_Thumb">
                                                    <img src={obj.img[0]} alt={obj.title} />
                                                </div>
                                                <div className="Checkout_Cart_LineItems_LineItem_Details">
                                                    <div>{obj.title}</div>
                                                    <div>
                                                        <span>Category:</span>
                                                        <span>{obj.category}</span>
                                                    </div>
                                                    
                                                    <div className="Checkout_Cart_LineItems_LineItem_Details_Quantity">
                                                        <span>Qty:</span>
                                                        <span>{obj.quantity}</span> 
                                                    </div>
                                                    
                                                    <div className="Checkout_Cart_LineItems_LineItem_Details_Size">
                                                        <span>Size:</span>
                                                        <span>{obj.size}</span> 
                                                    </div>
                                                    
                                                    <div className="Checkout_Cart_LineItems_LineItem_Details_Color">
                                                        <span>Color:</span>
                                                        <span>{obj.color}</span>  
                                                    </div>

                                                    {errors[obj._id] && (
                                                        <p style={{ color: 'red' }}>
                                                            {errors[obj._id]}{' '}
                                                            <a style={{ color: "#4acb4a", display: "inline" }} href={`/product?id=${obj._id}&&custom=1&&imgg=${obj.img[0]}`}>
                                                                add now
                                                            </a>
                                                        </p>
                                                    )}
                                                    <div className="Checkout_Cart_LineItems_LineItem_Price">
                                                        <span className="Currency">
                                                            <span className="Currency_Monetary">
                                                                ${(obj.price * obj.quantity).toFixed(2)}
                                                            </span>
                                                            <span className="Currency_Code">USD</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <button className="Checkout_Cart_LineItems_LineItem_Remove" onClick={() => handleRemoveFromCart(obj._id)}>
                                                    <span className="Checkout_Cart_LineItems_LineItem_Remove_Cross">
                                                        <span />
                                                        <span />
                                                    </span>
                                                    <span className="Checkout_Cart_LineItems_LineItem_Remove_Spinner">
                                                        <span />
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="MiniCart_Cart_EmptyCart">
                                        <span>You have no items in your shopping cart.</span>
                                    </div>
                                )}

                                <div>
                                    <div className="Checkout_Cart_LineItems_LineItem Checkout_Cart_LineItems_LineItem-SalesPromotion Checkout_Cart_LineItems_LineItem-SalesPromotion-Custom">
                                        <div className="Checkout_Cart_LineItems_LineItem_ContentBlock"></div>
                                        <div className="Checkout_Cart_LineItems_LineItem_Details">
                                            <div className="Checkout_Cart_LineItems_LineItem_Price">
                                                <span className="Currency">
                                                    <span className="Currency_Monetary">Total: ${subtotal}</span>
                                                    <span className="Currency_Code">USD</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <a className="Common_Button Common_Button--short MiniCart_Cart_CtaButton" href="/checkout" rel="nofollow">
                            <span>Go to checkout</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
