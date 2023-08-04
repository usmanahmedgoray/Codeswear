/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React,{useEffect} from 'react'
import { useRouter } from 'next/router';
import { BsArrowRightCircle } from "react-icons/bs";

const Forget = () => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/")
    }
  }, [])
  return (
    <div>
      <div className="flex h-full w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499123785106-343e69e68db1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80')" }}>
        <div className="rounded-xl bg-pink-500 bg-opacity-50 px-16 py-3 shadow-lg backdrop-blur-md max-sm:px-8 my-6">
          <div className="">
            <div className="mb-4 flex flex-col items-center">
              <img src="/logo.png" width="115" alt="" srcSet=""  className='my-2 mx-auto'/>
              <h1 className="mb-2 text-3xl font-bold">Recover Password</h1>
              <span className="text-white text-xs">Or <Link href="/Login" className='text-pink-600 underline text-sm'>Login</Link></span>
            </div>
            <form action="/">
              <div className="mb-4 text-lg flex flex-col">
                <label htmlFor="email" className='my-2 mx-2 text-white'>Email</label>
                <input className="rounded-xl border-none bg-opacity-50 px-6 py-2 shadow-lg outline-none backdrop-blur-md placeholder:text-lg" type="text" name="email" id='email' placeholder="example@gmail.com" />
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <button type="submit" className="rounded-3xl bg-pink-600 bg-opacity-50 px-10 py-2 text-white shadow-xl transition-colors duration-300 hover:bg-pink-900 mb-4 flex justify-between items-center space-x-1.5 hover:space-x-4">
                  <span>Continue</span>
                  <BsArrowRightCircle/>
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forget