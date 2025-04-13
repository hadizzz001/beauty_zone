"use client"


import React from 'react'
import { useCart } from '../context/CartContext';

const page = () => {

    const { cart , removeFromCart } = useCart();


    cart?.forEach(element => {
        // console.log(element.id);
        removeFromCart(element.id) 
      });



    return (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html:
                        "\n\n.Common_Button:focus, .Common_Button:hover { \n    background-image: none;\n    box-shadow: 0 20px 15px -17px rgba(0,0,0,.3), 0 1px 2px rgba(0,0,0,.3);\n    text-decoration: none;\n    color: white !important;\n}\n.Common_Button, .Common_Button:active, .Common_Button:visited {\n    background-color: #5bbccd;\n    background-image: none;\n    border-radius: 5px;\n    border: none;\n    box-shadow: 0 27px 15px -17px rgba(0,0,0,.3), 0 2px 4px rgba(0,0,0,.3);\n    color: #fff;\n    cursor: pointer;\n    display: block;\n    font-family: Lato,sans-serif;\n    font-size: 16px;\n    font-weight: 700;\n    height: 50px;\n    letter-spacing: 2px;\n    line-height: 50px;\n    outline: none;\n    text-decoration: none;\n    text-transform: uppercase;\n    transition: background-color .2s ease,box-shadow .2s ease;\n    width: 100%;\n}\n\n\n"
                }}
            />
            <div
                data-render-if="cart-is-initialised,cart-is-empty"
                className="Checkout_Empty"
                style={{ marginTop: "2em" }}
            >
                <div style={{ display: "inline-block" }}>
                    <svg fill="#7bff42" width="100px" height="100px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M760 380.4l-61.6-61.6-263.2 263.1-109.6-109.5L264 534l171.2 171.2L760 380.4z"></path></g></svg>
                </div>
                <h1 className="EmptyCartBlurb">Thank you for your purchase!</h1>
                <p className='mb-10'>Your order has been successfully processed.</p>
                <a
                    href="/"
                    className="Common_Button"
                    data-auto-id="true"
                    id="protected/checkout/checkout-page-with-layout-conditionals-continueshoppingpath-2"
                >
                    Return home
                </a>
            </div>
        </>
    )
}

export default page