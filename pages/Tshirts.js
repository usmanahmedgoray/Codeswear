/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import Product from "@/Models/Product";
import mongoose from 'mongoose';

const Tshirts = (props) => {
  const { tshirts } = props
  // console.log(products)
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center relative md:right-20">
            {Object.keys(tshirts).map((item) => {
              return <div key={tshirts[item]._id} className="lg:w-1/5 md:w-1/3 w-[20rem] p-4 flex justify-center items-center shadow-lg m-2">
                <Link passHref={true} key={tshirts[item]._id} href={`/product/${tshirts[item].slug}`}>
                  <img alt="ecommerce" className="m-auto md:mx-0 h-[13rem] md:h-[12rem]" src={tshirts[item].img} />
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{tshirts[item].category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{tshirts[item].title}</h2>
                    <p className="mt-1">Rs {tshirts[item].price}</p>
                    <div className="mt-1">
                      {tshirts[item].size.includes('S') && <span className='px-1 mr-1.5 border border-gray-400'>S</span>}
                      {tshirts[item].size.includes('M') && <span className='px-1 mr-1.5 border border-gray-400'>M</span>}
                      {tshirts[item].size.includes('L') && <span className='px-1 mr-1.5 border border-gray-400'>L</span>}
                      {tshirts[item].size.includes('XL') && <span className='px-1 mr-1.5 border border-gray-400'>XL</span>}
                      {tshirts[item].size.includes('XXL') && <span className='px-1 mr-1.5 border border-gray-400'>XXL</span>}
                    </div>
                    <div className="mt-1">
                      {tshirts[item].color.includes('red') && <button className="border-2 mr-0.5 border-gray-300 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {tshirts[item].color.includes('purple') && <button className="border-2 mr-0.5 border-gray-300 bg-purple-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {tshirts[item].color.includes('yellow') && <button className="border-2 mr-0.5 border-gray-300 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {tshirts[item].color.includes('blue') && <button className="border-2 mr-0.5 border-gray-300 bg-blue-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {tshirts[item].color.includes('black') && <button className="border-2 mr-0.5 border-gray-300 bg-black-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {tshirts[item].color.includes('green') && <button className="border-2 mr-0.5 border-gray-300 bg-green-500 rounded-full w-6 h-6 focus:outline-none"></button>}
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
  let products = await Product.find({category : 'TShirts'})
  let tshirts = {};
  for (let item of products) {
    if (item.title in tshirts) {
      if (!tshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
        tshirts[item.title].color.push(item.color)
      }
      if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
        tshirts[item.title].size.push(item.size)
      }
    }
    else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        tshirts[item.title].size = [item.size]
        tshirts[item.title].color = [item.color]

      }
    }
  }
  return {
    props: { tshirts: JSON.parse(JSON.stringify(tshirts)) }, // will be passed to the page component as props
  }
}

export default Tshirts