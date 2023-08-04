import React from 'react';
import Link from 'next/link';
import { SlClose } from "react-icons/sl";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillMinusCircle } from "react-icons/ai";

const Checkout = (props) => {
  // Destructuring the props objects
  const { Cart, addToCart, removeFromCart,subTotal } = props;
  return (
    <div className='container m-auto'>
      <h1 className='font-bold text-3xl text-center my-9'>Checkout</h1>

      {/* Add the Delivery Details for delivery */}
      <h2 className='font-semibold text-xl mx-2'>1. Delivery Details</h2>
      <div className='mx-auto flex my-5'>
        <div className='w-1/2 px-2'>
          <div className=" mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete='off' placeholder='e.g, Joe Dove' />
          </div>
        </div>
        <div className='w-1/2 px-2'>
          <div className=" mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete='off' placeholder='e.g, example@email.com' />
          </div>
        </div>
      </div>
      <div className='w-full px-2'>
        <div className=" mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Address</label>
          <textarea name="address" id="address" cols="10" rows="3" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete='off' placeholder='Enter your address'></textarea>
        </div>
      </div>
      <div className='mx-auto flex my-5'>
        <div className='w-1/2 px-2'>
          <div className=" mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input type="tel" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete='off' placeholder='e.g. +012-123456789' />
          </div>
        </div>
        <div className='w-1/2 px-2'>
          <div className=" mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
            <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete='off' placeholder='e.g. Faisalabad' />
          </div>
        </div>
      </div>
      <div className='mx-auto flex my-5'>
        <div className='w-1/2 px-2'>
          <div className=" mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete='off' placeholder='e.g. Punjab' />
          </div>
        </div>
        <div className='w-1/2 px-2'>
          <div className=" mb-4">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
            <input type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" autoComplete='off' placeholder='e.g. 12345' />
          </div>
        </div>
      </div>

      {/*Add the Review the Cart item  */}
      <h2 className='font-semibold text-xl mx-2'>2. Review Cart Items</h2>
      <div className="sideCart bg bg-pink-100 p-2 px-8 py-4 md:w-2/3 w-auto my-8 mx-2" >
        <ol className='list-decimal'>
          {Object.keys(Cart).length === 0 &&
            <div className='my-5 text-lg text-center'>
              Your cart is empty!
            </div>
          }
          {Object.keys(Cart).map((e) => {
            return (<li key={e}>
              <div className="item flex my-2">
                <div className='select-none w-2/3 font-semibold text-base'>{Cart[e].name} ({Cart[e].size}/{Cart[e].variant})</div>
                <div className='select-none w-1/3 flex justify-center items-center font-semibold text-2xl md:text-xl'>
                  <AiFillMinusCircle onClick={() => removeFromCart(e, 1, Cart[e].price, Cart[e].name, Cart[e].size, Cart[e].variant)} className='cursor-pointer text-pink-500 active:text-red-600 mx-2 ' />
                  <span className='mx-2 text-base md:text-lg '>{Cart[e].qty}</span>
                  <IoIosAddCircle onClick={() => addToCart(e, 1, Cart[e].price, Cart[e].name, Cart[e].size, Cart[e].variant)} className='cursor-pointer text-pink-500 active:text-green-800 mx-2 ' />
                </div>
              </div>
            </li>)
          })}
        </ol>
          {Object.keys(Cart).length !== 0 &&
          <span className="total font-semibold">Sub-Total : Rs {subTotal}</span>
          }
      </div>
      <div className="mx-2">
      <Link href="/Checkout">
        <button className={`text-sm text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded active:bg-pink-700 flex justify-center items-center ${Object.keys(Cart).length == 0 && `hidden`}`}>
          {/* < BsFillBagCheckFill className='mx-1'/> */}
          {Object.keys(Cart).length !== 0 && `Pay Rs ${subTotal}`}
        </button>
        </Link>
      </div>
    </div>
  )
}

export default Checkout