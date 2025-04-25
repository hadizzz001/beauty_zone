import React, { useState, useEffect } from 'react';
import { useFavorites } from '../app/context/FavContext';
import { useBooleanValue } from '../app/context/CartBoolContext';

const Cart = () => {
    const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
    const { isBooleanValue, setBooleanValue } = useBooleanValue();

    const handleRemoveFromCart = (itemId) => {
        removeFromFavorites(itemId);
    };





    const handleClickf = () => {
        var cartb = document.getElementById("favid");
        var cartb2 = document.getElementById("favid2");
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
                <div className="MiniCart_Slider_Overlay" id="favid" />
                <div className="MiniCart_Slider">
                    <div className="MiniCart_Slider_CloseButton">
                        <slot name="close-button" />
                    </div>
                    <slot />
                </div>
            </div>

            <div className="Checkout">
                <div id="favid2" className="MiniCart_Cart" style={{ zIndex: "99999999" }}>
                    <div className="MiniCart_Cart_Heading br_text-grey-500 mt-2">

                        <span className="myNewC">Your Favourite</span>
                        <button
                            slot="close-button"
                            className="MiniCart_Cart_CloseButton"
                            aria-label="Close"
                            id="favid"
                            style={{ zIndex: "99999999999" }}
                            onClick={handleClickf}
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
                                {favorites && favorites.length > 0 ? (
                                    favorites.map((obj) => (
                                        <div key={obj._id}>
                                            <div className="Checkout_Cart_LineItems_LineItem">
                                                <a style={{display: "contents"}} href={`/product?id=${obj._id}&&imgg=${obj.img[0]}`}>
                                                    <div className="Checkout_Cart_LineItems_LineItem_Thumb">
                                                        <img src={obj.img[0]} alt={obj.title} />
                                                    </div>
                                                    <div className="Checkout_Cart_LineItems_LineItem_Details myNewC">
                                                        {obj.title}
                                                        <div>
                                                            <span className="myNewC">Category:</span>
                                                            <span className="myNewC">{obj.category}</span>
                                                        </div>


                                                        <div className="Checkout_Cart_LineItems_LineItem_Price">
                                                            <span className="Currency">
                                                                <span className="Currency_Monetary myNewC">
                                                                    ${obj.discount}
                                                                </span>
                                                                <span className="Currency_Code myNewC">USD</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </a>

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
                                    <div data-render-if="cart-is-empty" className="MiniCart_Cart_EmptyCart">
                                        <span className="myNewC">You have no items in your favourite.</span>
                                    </div>
                                )}


                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
