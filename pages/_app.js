/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {
  // declare the useRouter to use 
  const router = useRouter();
  
  // Declaring the UseState Hooks for state handling
  const [Cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({value:null})
  const [key, setKey] = useState(0);
  const [progress, setProgress] = useState(0)
  
  // Declare the useEffect hook for get the data in localStorage
  useEffect(() => {
    router.events.on("routeChangeStart",()=>{
      setProgress(40)
    })
    router.events.on("routeChangeComplete",()=>{
      setProgress(100)
    })
    // Wrap the method in tryCatch
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      console.error(error)
      localStorage.clear();
    }
    let token = localStorage.getItem("token");
    if(token){
      setUser({value:token});
      setKey(Math.random())
    }
  }, [router.query])

  const Logout = ()=>{
    localStorage.removeItem("token")
    setKey(Math.random())
    setUser({value:null})
    router.push("/")
  }
  

  // Savce Cart in local Storage
  const saveCart = (newCart)=>{
    localStorage.setItem('cart',JSON.stringify(newCart));
    let subt = 0;
    let keys = Object.keys(newCart);
    for (let i = 0; i < keys.length; i++) {
      subt+= newCart[keys[i]].price * newCart[keys[i]].qty
    }
    setSubTotal(subt)
  }

  // Create a fnction for adding items in Cart
  const addToCart = (itemCode,qty,price,name,size,variant) =>{
    let newCart = JSON.parse(JSON.stringify(Cart));
    // check the item code in cart to update the card item quantity
    if(itemCode in Cart){
      newCart[itemCode].qty = Cart[itemCode].qty + qty

    }
    else{
      newCart[itemCode] = {qty:1,price,name,size,variant}
    }
    // set the cart in cart state
    setCart(newCart);
    // pass the parameter in save cart Method
    saveCart(newCart)
  }

  // Create a function for clear the cart

  const clearCart = () =>{
    setCart({});
    saveCart({})
  }

  // Create a Function for Remove an item from cart
  const removeFromCart = (itemCode,qty,price,name,size,variant) =>{
    let newCart = JSON.parse(JSON.stringify(Cart));

    // check the item code in cart to update state the card item quantity

    if(itemCode in Cart){
      newCart[itemCode].qty = Cart[itemCode].qty- qty
    }
    
    if(newCart[itemCode]["qty"]<=0){
      delete newCart[itemCode]
    }
    setCart(newCart);
    saveCart(newCart)
  }

  // create a function for Buy Now
  const buyNow = (itemCode,qty,price,name,size,variant)=>{
    let newCart = {itemCode:{qty,price,name,size,variant}} 
    setCart(newCart);
    saveCart(newCart)
    router.push('/Checkout')
  }
  return (
    <>
    <LoadingBar
        color='rgb(219 39 119)'
        height={3}
        progress={progress}
        waitingTime={400}
        shadow = {true}
        onLoaderFinished={() => setProgress(0)}
      />
    <Head>
      <title>Codeswear.com - wear the code</title>
    </Head>
    {key && <Navbar user = {user} key= {key} Cart ={Cart} addToCart ={addToCart} removeFromCart ={removeFromCart} clearCart = {clearCart} subTotal = {subTotal} Logout = {Logout} />}
  <Component buyNow = {buyNow} {...pageProps} Cart ={Cart} addToCart ={addToCart} removeFromCart ={removeFromCart} clearCart = {clearCart} subTotal = {subTotal} />
  <Footer/>
    </>
  )
  
}
