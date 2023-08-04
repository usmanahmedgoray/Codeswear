/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import Product from "@/Models/Product";
import mongoose from 'mongoose';

const Mugs = (props) => {
  const { Mugs } = props
  // console.log(products)
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center relative md:right-20">
            {Object.keys(Mugs).length === 0 && <p>Sorry! Products of this category is out of stock. Please stay tune!</p>}
            {Object.keys(Mugs).map((item) => {
              return <div key={Mugs[item]._id} className="lg:w-1/5 md:w-1/3 w-[20rem] p-4 flex justify-center items-center shadow-lg m-2">
                <Link passHref={true} key={Mugs[item]._id} href={`/product/${Mugs[item].slug}`}>
                  <img alt="ecommerce" className="m-auto md:mx-0 h-[13rem] md:h-[12rem]" src={Mugs[item].img} />
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{Mugs[item].category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{Mugs[item].title}</h2>
                    <p className="mt-1">Rs {Mugs[item].price}</p>
                    <div className="mt-1">
                      {Mugs[item].size.includes('S') && <span className='px-1 mr-1.5 border border-gray-400'>S</span>}
                      {Mugs[item].size.includes('M') && <span className='px-1 mr-1.5 border border-gray-400'>M</span>}
                      {Mugs[item].size.includes('L') && <span className='px-1 mr-1.5 border border-gray-400'>L</span>}
                      {Mugs[item].size.includes('XL') && <span className='px-1 mr-1.5 border border-gray-400'>XL</span>}
                      {Mugs[item].size.includes('XXL') && <span className='px-1 mr-1.5 border border-gray-400'>XXL</span>}
                    </div>
                    <div className="mt-1">
                      {Mugs[item].color.includes('red') && <button className="border-2 mr-0.5 border-gray-300 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {Mugs[item].color.includes('purple') && <button className="border-2 mr-0.5 border-gray-300 bg-purple-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {Mugs[item].color.includes('yellow') && <button className="border-2 mr-0.5 border-gray-300 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {Mugs[item].color.includes('blue') && <button className="border-2 mr-0.5 border-gray-300 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {Mugs[item].color.includes('black') && <button className="border-2 mr-0.5 border-gray-300 bg-black-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {Mugs[item].color.includes('green') && <button className="border-2 mr-0.5 border-gray-300 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>}
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
  let products = await Product.find({category : 'Mugs'})
  let Mugs = {};
  for (let item of products) {
    if (item.title in Mugs) {
      if (!Mugs[item.title].color.includes(item.color) && item.availableQty > 0) {
        Mugs[item.title].color.push(item.color)
      }
      if (!Mugs[item.title].size.includes(item.size) && item.availableQty > 0) {
        Mugs[item.title].size.push(item.size)
      }
    }
    else {
      Mugs[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        Mugs[item.title].size = [item.size]
        Mugs[item.title].color = [item.color]

      }
    }
  }
  return {
    props: { Mugs: JSON.parse(JSON.stringify(Mugs)) }, // will be passed to the page component as props
  }
}

export default Mugs