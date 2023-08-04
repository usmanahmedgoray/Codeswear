/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import Product from "@/Models/Product";
import mongoose from 'mongoose';

const Hoodies = (props) => {
  const { Hoodies } = props
  // console.log(products)
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center relative md:right-20">
            {Object.keys(Hoodies).length === 0 && <p>Sorry! Products of this category is out of stock. Please stay tune!</p>}
            {Object.keys(Hoodies).map((item) => {
              return <div key={Hoodies[item]._id} className="lg:w-1/5 md:w-1/3 w-[20rem] p-4 flex justify-center items-center shadow-lg m-2">
                <Link passHref={true} key={Hoodies[item]._id} href={`/product/${Hoodies[item].slug}`}>
                  <img alt="ecommerce" className="m-auto md:mx-0 h-[13rem] md:h-[12rem]" src={Hoodies[item].img} />
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{Hoodies[item].category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{Hoodies[item].title}</h2>
                    <p className="mt-1">Rs {Hoodies[item].price}</p>
                    <div className="mt-1">
                      {Hoodies[item].size.includes('S') && <span className='px-1 mr-1.5 border border-gray-400'>S</span>}
                      {Hoodies[item].size.includes('M') && <span className='px-1 mr-1.5 border border-gray-400'>M</span>}
                      {Hoodies[item].size.includes('L') && <span className='px-1 mr-1.5 border border-gray-400'>L</span>}
                      {Hoodies[item].size.includes('XL') && <span className='px-1 mr-1.5 border border-gray-400'>XL</span>}
                      {Hoodies[item].size.includes('XXL') && <span className='px-1 mr-1.5 border border-gray-400'>XXL</span>}
                    </div>
                    <div className="mt-1">
                      {Hoodies[item].color.includes('red') && <button className="border-2 mr-0.5 border-gray-300 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {Hoodies[item].color.includes('purple') && <button className="border-2 mr-0.5 border-gray-300 bg-purple-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {Hoodies[item].color.includes('yellow') && <button className="border-2 mr-0.5 border-gray-300 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {Hoodies[item].color.includes('blue') && <button className="border-2 mr-0.5 border-gray-300 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {Hoodies[item].color.includes('black') && <button className="border-2 mr-0.5 border-gray-300 bg-black-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {Hoodies[item].color.includes('green') && <button className="border-2 mr-0.5 border-gray-300 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                    </div>
                  </div>
                </Link>
              </div>
            })}
          </div>
        </div>
      </section>
    </div>

  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.Mongo_URL);
  }
  let products = await Product.find({category : 'Hoodies'})
  let Hoodies = {};
  for (let item of products) {
    if (item.title in Hoodies) {
      if (!Hoodies[item.title].color.includes(item.color) && item.availableQty > 0) {
        Hoodies[item.title].color.push(item.color)
      }
      if (!Hoodies[item.title].size.includes(item.size) && item.availableQty > 0) {
        Hoodies[item.title].size.push(item.size)
      }
    }
    else {
      Hoodies[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        Hoodies[item.title].size = [item.size]
        Hoodies[item.title].color = [item.color]

      }
    }
  }
  return {
    props: { Hoodies: JSON.parse(JSON.stringify(Hoodies)) }, // will be passed to the page component as props
  }
}

export default Hoodies