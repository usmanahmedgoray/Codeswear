/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React,{useEffect} from 'react'
import Order from "@/Models/Order";
import mongoose from 'mongoose';
import { useRouter } from 'next/router';

const Orders = () => {
    const router = useRouter()
    useEffect(() => {
        if (!localStorage.getItem("token")) {
          router.push("/")
        }
      }, [])
  return (
    <>
    <section className='m-28'>
    <h1 className='my-8 font-bold text-2xl'>My Orders</h1>
    
<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left text-black ">
        <thead className="text-xs text-white uppercase bg-gray-900">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Color
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Apple MacBook Pro 17
                </th>
                <td className="px-6 py-4">
                    Silver
                </td>
                <td className="px-6 py-4">
                    Laptop
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
            </tr>
            <tr className="bg-white border-b ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                    White
                </td>
                <td className="px-6 py-4">
                    Laptop PC
                </td>
                <td className="px-6 py-4">
                    $1999
                </td>
            </tr>
            <tr className="bg-white ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    Magic Mouse 2
                </th>
                <td className="px-6 py-4">
                    Black
                </td>
                <td className="px-6 py-4">
                    Accessories
                </td>
                <td className="px-6 py-4">
                    $99
                </td>
            </tr>
        </tbody>
    </table>
</div>
</section>

    </>
  )
}

export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.Mongo_URL);
  }
  let orders = await Order.find({})
  
  return {
    props: { order : orders}, // will be passed to the page component as props
  }
}

export default Orders