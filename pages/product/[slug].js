/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useState } from "react";
import Product from "@/Models/Product";
import mongoose from 'mongoose';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Post = (props) => {
  

  const { addToCart, product, variant, buyNow } = props;


  const router = useRouter();
  const { slug } = router.query;

  // Declare the useState Hooks
  const [pin, setPin] = useState()
  const [service, setService] = useState()



  // Function for the check pincode availablity
  const checkServiceAbility = async () => {
    const pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    const jsonData = await pins.json(); 

    if (jsonData.includes(parseInt(pin))) {
      setService(true)
      // Add the toast in the pin alert
      toast.success('Congratulation! Your pincode is available', {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    else {
      setService(false)
      // Add the toast in the pin alert
      toast.error('Sorry! Your pincode is not available', {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  // function for handle the onChange
  const handleChange = (e) => {
    setPin(e.target.value)
  }

  // Function for refresh the page on change the color and size
  const changeVariant = async (newColor, newSize) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variant[newColor][newSize]['slug']}`
    router.push(url)

  }


  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden relative md:right-20">
        <ToastContainer
          position="bottom-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        {/* Same as */}
        <ToastContainer />
        <div className="container px-5 py-16 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto px-24 md:px-72 lg:px-16 xl:px-28 object-top object-cover rounded"
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                CODESWEAR
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title} ({product.size}/{product.color})
              </h1>
              {/* <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div> */}
              <p className="leading-relaxed">
                {product.desc}
              </p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(variant).includes('white') && Object.keys(variant['white']).includes(product.size) && <button onClick={() => changeVariant('white', product.size)} className={`border-2  bg-white rounded-full w-6 h-6 focus:outline-none ${product.color === 'white' ? 'ring-2 ring-pink-500 ring-offset-0.5' : 'border-gray-400'}`}></button>}
                  {Object.keys(variant).includes('red') && Object.keys(variant['red']).includes(product.size) && <button onClick={() => changeVariant('red', product.size)} className={`border-2  ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none ${product.color === 'red' ? 'ring-2 ring-pink-500 ring-offset-0.5' : 'border-gray-400'}`}></button>}
                  {Object.keys(variant).includes('purple') && Object.keys(variant['purple']).includes(product.size) && <button onClick={() => changeVariant('purple', product.size)} className={`border-2  ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none ${product.color === 'purple' ? 'ring-2 ring-pink-500 ring-offset-0.5' : 'border-gray-400'}`}></button>}
                  {Object.keys(variant).includes('yellow') && Object.keys(variant['yellow']).includes(product.size) && <button onClick={() => changeVariant('yellow', product.size)} className={`border-2  ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none ${product.color === 'yellow' ? 'ring-2 ring-pink-500 ring-offset-0.5' : 'border-gray-400'}`}></button>}
                  {Object.keys(variant).includes('blue') && Object.keys(variant['blue']).includes(product.size) && <button onClick={() => changeVariant('blue', product.size)} className={`border-2  ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none ${product.color === 'blue' ? 'ring-2 ring-pink-500 ring-offset-0.5' : 'border-gray-400'}`}></button>}
                  {Object.keys(variant).includes('black') && Object.keys(variant['black']).includes(product.size) && <button onClick={() => changeVariant('black', product.size)} className={`border-2  ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${product.color === 'black' ? 'ring-2 ring-pink-500 ring-offset-0.5' : 'border-gray-400'}`}></button>}
                  {Object.keys(variant).includes('green') && Object.keys(variant['green']).includes(product.size) && <button onClick={() => changeVariant('green', product.size)} className={`border-2  ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none ${product.color === 'green' ? 'ring-2 ring-pink-500 ring-offset-0.5' : 'border-gray-400'}`}></button>}
                  {Object.keys(variant).includes('gray') && Object.keys(variant['gray']).includes(product.size) && <button onClick={() => changeVariant('gray', product.size)} className={`border-2  ml-1 bg-gray-500 rounded-full w-6 h-6 focus:outline-none ${product.color === 'gray' ? 'ring-2 ring-pink-500 ring-offset-0.5' : 'border-gray-400'}`}></button>}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select value={product.size} onChange={(e) => changeVariant(product.color, e.target.value)} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10">
                      {Object.keys(variant[product.color]).includes('S') && <option value={'S'}>S</option>}
                      {Object.keys(variant[product.color]).includes('M') && <option value={'M'}>M</option>}
                      {Object.keys(variant[product.color]).includes('L') && <option value={'L'}>L</option>}
                      {Object.keys(variant[product.color]).includes('XL') && <option value={'XL'}>XL</option>}
                      {Object.keys(variant[product.color]).includes('XXL') && <option value={'XXL'}>XXL</option>}

                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between md:justify-stretch items-center ">
                <span className="title-font font-medium text-lg md:text-2xl text-gray-900">
                  Rs {product.price}
                </span>
                <div className="flex md:justify-start items-center">
                  <button onClick={() => buyNow(slug, 1, product.price, product.title, product.size, product.color)} className="flex ml-1 md:ml-6 lg:ml-3 text-white bg-pink-500 border-0 md:py-2 lg:py-1 lg:px-2 py-1 md:px-4 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm md:text-lg">
                    Buy Now
                  </button>
                  <button onClick={() => addToCart(slug, 1, product.price, product.title, product.size, product.color)} className="flex ml-1 md:ml-6 lg:ml-3 text-white bg-pink-500 border-0 md:py-2 py-1 lg:py-1 lg:px-2 md:px-4 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm md:text-lg">
                    ADD CART
                  </button>
                  {/* <button className="rounded-full w-8 h-8 md:w-10 md:h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-2 md:ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button> */}
                </div>
              </div>
              <div className="pin mt-8 flex md:space-x-6 space-x-3 text-sm md:content-start">
                <input onChange={handleChange} className="p-2 border-2 outline-none border-pink-400 rounded-lg " autoComplete="off" type="text" name="pin" id="pin" placeholder="Enter the code" />
                <button onClick={checkServiceAbility} className="flex ml-16 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded md:text-lg">
                  Check
                </button>
              </div>
              {
                !service && service != null && <div className="text-red-700 text-sm mt-4">
                  Sorry! We do not deliever to this pincode yet
                </div>
              }
              {
                service && service != null && <div className="text-green-700 text-sm mt-4">
                  Yay! This pincode is serviceable
                </div>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Add the logic of server side rendering

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.Mongo_URL);
  }
  let product = await Product.findOne({ slug: context.query.slug });
  let variant = await Product.find({ title: product.title, category:product.category });
  let colorSizeSlug = {}; // {red:{xl:{slug:wear the code x-large}}}
  for (const item of variant) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    } else {
      colorSizeSlug[item.color] = {}
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
  }

  return {
    props: { product: JSON.parse(JSON.stringify(product)), variant: JSON.parse(JSON.stringify(colorSizeSlug)) }, // will be passed to the page component as props
  }
}

export default Post;
