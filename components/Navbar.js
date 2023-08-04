/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsCart3, BsFillBagCheckFill } from 'react-icons/bs';
import { SlClose } from "react-icons/sl";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillMinusCircle } from "react-icons/ai";
import { MdOutlineClear, MdAccountCircle } from "react-icons/md";
import { useRouter } from 'next/router';


const Navbar = (props) => {
  // Destructuring the functions and variables from props
  const { Cart, addToCart, removeFromCart, clearCart, subTotal, user,Logout } = props;

  // Declare the useState Hook
  const [isOpen, setIsOpen] = useState(true)
  const [dropdown, setDropdown] = useState(false)

  // Declare the UseRef Variable
  const cartRef = useRef()
  // get the path from useRouter()
  const { asPath } = useRouter()

  // handle the translation of sidebar

  useEffect(() => {
    cartRef.current.classList.add('translate-x-full');
    cartRef.current.classList.remove('translate-x-0');
    cartRef.current.classList.add('hidden')
  }, [asPath])

  // handle the toggling of toggle cart  

  const toggleCart = () => {
    if (isOpen) {
      cartRef.current.classList.remove('translate-x-full');
      cartRef.current.classList.add('translate-x-0');
      cartRef.current.classList.remove('hidden')
      setIsOpen(false)
    }
    else {
      cartRef.current.classList.add('translate-x-full');
      cartRef.current.classList.remove('translate-x-0');
      cartRef.current.classList.add('hidden')
      setIsOpen(true)

    }
  }

  return (
    <div className='flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md sticky top-0 bg-white z-20'>
      {/* Add the logo in the Navbar */}
      <div className="logo mr-auto md:mr-0 mx-5 select-none">
        <Link href={"/"}>
          <Image src="/nav.png" alt="" width={200} height={40} />
        </Link>
      </div>
      {/* Navigation bar Menu */}
      <div className="nav md:my-0 my-3">
        <ul className='flex items-center space-x-3 md:space-x-6 font-semibold md:text-base'>
          <Link href="/Tshirts"><li className='hover:text-pink-600 active:scale-110'>Tshirts</li></Link>
          <Link href="/Hoodies"><li className='hover:text-pink-600 active:scale-110'>Hoodies</li></Link>
          <Link href="/Mugs"><li className='hover:text-pink-600 active:scale-110'>Mugs</li></Link>
          <Link href="/Stickers"><li className='hover:text-pink-600 active:scale-110'>Stickers</li></Link>
        </ul>
      </div>
      {dropdown && <div id="dropdownHover" class=" bg-pink-600 divide-y  divide-gray-100 rounded-lg shadow-md w-44 absolute right-10 top-10 " onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} >
          <ul class="py-2 text-sm text-white  " aria-labelledby="dropdownHoverButton">
            <li>
              <Link href="/MyAccount" className="block px-4 py-2 hover:bg-gray-100 hover:text-pink-600 ">My Account</Link>
            </li>
            <li>
              <Link href="/Orders" className="block px-4 py-2 hover:bg-gray-100 hover:text-pink-600 ">Orders</Link>
            </li>
            <li>
              <span onClick={Logout} className="block px-4 py-2 hover:bg-gray-100 hover:text-pink-600 cursor-pointer">Sign out</span>
            </li>
          </ul>
        </div>}
      {/* Cart icon and buuton for toggle it */}
      <div className={`cart absolute right-0 top-2 ${user.value === null ? "":"md:top-4"}  mx-4 font-semibold flex items-center `}>

        {user.value && <MdAccountCircle onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} onClick={()=>{setDropdown(!dropdown)}} className='text-xl md:text-2xl cursor-pointer hover:text-pink-700 duration-200} ease-in-out mx-2' />}
        

        {!user.value && <Link href={"/Login"}>
          <button className='bg-pink-700 p-2 text-white mx-3 rounded-md'>Login</button>
        </Link>}
        <BsCart3 onClick={toggleCart} className='text-xl md:text-2xl cursor-pointer hover:text-pink-700 duration-200 ease-in-out' />
      </div>
      {/* sidebar of Cart  */}
      <div ref={cartRef} className="sideCart absolute overflow-y-auto top-0 right-0 bg bg-pink-100 p-2 px-8 py-10 transform transition-transform translate-x-full w-64 h-[100vh]">
        <h1 className='font-bold text-2xl select-none text-center'>Shopping Cart</h1>
        <span onClick={toggleCart} className='absolute top-4 right-4 text-xl active:text-2xl cursor-pointer select-none text-pink-700' >
          <SlClose />
        </span>
        <ol className='list-decimal'>
          {Object.keys(Cart).length === 0 &&
            <div className='my-5 text-lg text-center'>
              Your cart is empty!
            </div>
          }
          {Object.keys(Cart).map((e) => {
            return (<li key={e}>
              <div className="item flex my-4">
                <div className='select-none w-2/3 font-semibold text-base'>{Cart[e].name} ({Cart[e].size}/{Cart[e].variant})</div>
                <div className='select-none w-1/3 flex justify-evenly items-center font-semibold text-lg md:text-xl'>
                  <AiFillMinusCircle onClick={() => removeFromCart(e, 1, Cart[e].price, Cart[e].name, Cart[e].size, Cart[e].variant)} className='cursor-pointer text-pink-500 active:text-red-600 ' />
                  <span className='mx-2 text-lg'>{Cart[e].qty}</span>
                  <IoIosAddCircle onClick={() => addToCart(e, 1, Cart[e].price, Cart[e].name, Cart[e].size, Cart[e].variant)} className='cursor-pointer text-pink-500 active:text-green-800' />
                </div>
              </div>
            </li>)
          })}
          {Object.keys(Cart).length !== 0 &&
            <div className="total font-semibold">Sub-Total : Rs {subTotal}</div>
          }
        </ol>
        <div className="buttons flex justify-between items-center my-4 ">
          <Link href="/Checkout">
            <button className="text-xs text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded active:bg-pink-700 flex justify-center items-center">
              < BsFillBagCheckFill className='mx-1' />
              Checkout
            </button>
          </Link>
          <button onClick={clearCart} className="text-xs text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded active:bg-pink-700 flex justify-center items-center">
            <MdOutlineClear className='mx-0.5' />
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar