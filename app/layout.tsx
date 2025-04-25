 
"use client"

import { useState, useEffect } from "react";
import {  Footer,Navbar2 } from '../components'
import './globals.css'
import './custom.css'
import './bootstrap.min.css'
import './bs-select.css'
import './slick.css'
import { useSearchParams } from 'next/navigation'
import { CartProvider } from './context/CartContext';
import { FavoriteProvider } from './context/FavContext';
import { BooleanProvider } from './context/CartBoolContext'; 
import GifLoader from '../components/GifLoader'
import WhatsAppIcon from '../components/WhatsAppIcon';
import Offer from '../components/Offer';
import StickyMapButton from '../components/StickyMapButton';
import Script from "next/script";
import { GoogleAnalytics } from '@next/third-parties/google'
import PointsWatcher from "../components/PointsWatcher";
import SpinGame  from "../components/SpinGame";
import ChatWidget from "../components/ChatWidget";
 

 

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {



 

  return (
    <html className="no-js no-touch supports-no-cookies" lang="en"> 
    <>
  <meta content="text/html; charset=utf-8" httpEquiv="Content-Type" />
  <meta content="en" httpEquiv="Content-Language" />
  <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
  <meta
    content="width=device-width, initial-scale=1, maximum-scale=1"
    name="viewport"
  />
  <meta content="max-image-preview:large" name="robots" />
  <title>
    Beauty Zone
  </title>
  <meta
    content="At Beauty Zone, we're reshaping the way businesses connect."
    name="description" 
  />
  <meta content="Beauty Zone" name="keywords" property="Beauty Zone, beauty, men, women" />

 
 
  <meta content="#ffffff" name="msapplication-TileColor" />
  <meta content="#ffffff" name="theme-color" />
  <link href="https://assets.bellroy.com" rel="preconnect" />
  <link href="https://bellroy.imgix.net" rel="preconnect" /> 
  

 
 










  <link
    href="css/webfonts-3e3c2400.css"
    rel="preload"
    as="style"
  />
  <link
    rel="stylesheet"
    href="css/webfonts-3e3c2400.css"
    media="print" 
  />
  <link
    rel="stylesheet"
    href="css/style-4109db2b.css"
  />

<link href="https://fonts.cdnfonts.com/css/lato" rel="stylesheet"/> 
 

 
  
</>

      <body>
      <ChatWidget />
      <SpinGame />
      <PointsWatcher />
      <GifLoader />

      <Offer /> 
        <BooleanProvider>
        <CartProvider>
        <FavoriteProvider>
          <Navbar2 />
          <WhatsAppIcon />
          <StickyMapButton />
          {children}
          {/* <GoogleAnalytics gaId="G-GKVJEXB18C" /> */}
          
          <Footer />
          </FavoriteProvider>
        </CartProvider>
        </BooleanProvider>
        
      </body>
    </html>
  )
}
