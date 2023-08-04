/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useState,useEffect } from 'react'
// Add the Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const router = useRouter()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/")
    }
  }, [])

  const handleChange = (e) => {
    if (e.target.name === 'name') {
      setName(e.target.value)
    }
    else if (e.target.name === 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { name, email, password }
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log(result);
      // Add the toastify
      if(result.success === "true"){

        toast.success('Your account has been created successfully', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(()=>{
          router.push(`${process.env.NEXT_PUBLIC_HOST}`)
        },2000)
      }
      else{
        toast.error('Sorry! An account with this email has been already existed', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setName('');
    setEmail('');
    setPassword('');


  }
  return (
    <form >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="bg-white relative lg:py-16">
        <div className="flex flex-col items-center justify-between py-0 px-2 md:px-10 mx-auto max-w-7xl xl:px-5 lg:flex-row">
          <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
            <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
              <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
                <img src="https://res.cloudinary.com/macxenon/image/upload/v1631570592/Run_-_Health_qcghbu.png" className="btn-" />
              </div>
            </div>
            <div className="w-full mt-20 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
              <div className="flex flex-col items-start justify-start py-10 px-3 md:px-10 bg-white shadow-2xl rounded-xl
            relative z-10">
                <img src="/logo.png" width="115" alt="" srcSet="" className='my-2 mx-auto' />
                <p className="w-full text-xl md:text-4xl font-medium text-center leading-snug font-serif">Sign up for an account</p>
                <p className="w-full font-medium text-center leading-snug font-serif">Or <Link href="/Login" className='text-pink-600 underline text-base'>Login</Link></p>
                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                  <div className="relative">
                    <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute">Name</p>
                    <input placeholder="John" type="text" name='name' className="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md" onChange={handleChange} value={name} />
                  </div>
                  <div className="relative">
                    <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">Email</p>
                    <input placeholder="123@ex.com" type="text" name='email' className="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md" onChange={handleChange} value={email} />
                  </div>
                  <div className="relative">
                    <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                  absolute">Password</p>
                    <input placeholder="Password" type="password" name='password' className="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md" onChange={handleChange} value={password} />
                  </div>
                  <div className="relative">
                    <a className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-base md:text-xl font-medium text-center text-white bg-pink-500 rounded-lg transition duration-200 hover:bg-pink-600 ease cursor-pointer" onClick={handleSubmit}>Submit</a>
                  </div>
                </div>
              </div>
              <svg viewBox="0 0 91 91" className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-pink-500
            fill-current"><g stroke="none" strokeWidth="1" fillRule="evenodd"><g fillRule="nonzero"><g><g><circle
                  cx="3.261" cy="3.445" r="2.72" /><circle cx="15.296" cy="3.445" r="2.719" /><circle cx="27.333" cy="3.445"
                    r="2.72" /><circle cx="39.369" cy="3.445" r="2.72" /><circle cx="51.405" cy="3.445" r="2.72" /><circle cx="63.441"
                      cy="3.445" r="2.72" /><circle cx="75.479" cy="3.445" r="2.72" /><circle cx="87.514" cy="3.445" r="2.719" /></g><g
                        transform="translate(0 12)"><circle cx="3.261" cy="3.525" r="2.72" /><circle cx="15.296" cy="3.525"
                          r="2.719" /><circle cx="27.333" cy="3.525" r="2.72" /><circle cx="39.369" cy="3.525" r="2.72" /><circle
                      cx="51.405" cy="3.525" r="2.72" /><circle cx="63.441" cy="3.525" r="2.72" /><circle cx="75.479" cy="3.525"
                        r="2.72" /><circle cx="87.514" cy="3.525" r="2.719" /></g><g transform="translate(0 24)"><circle cx="3.261"
                          cy="3.605" r="2.72" /><circle cx="15.296" cy="3.605" r="2.719" /><circle cx="27.333" cy="3.605" r="2.72" /><circle
                      cx="39.369" cy="3.605" r="2.72" /><circle cx="51.405" cy="3.605" r="2.72" /><circle cx="63.441" cy="3.605"
                        r="2.72" /><circle cx="75.479" cy="3.605" r="2.72" /><circle cx="87.514" cy="3.605" r="2.719" /></g><g
                          transform="translate(0 36)"><circle cx="3.261" cy="3.686" r="2.72" /><circle cx="15.296" cy="3.686"
                            r="2.719" /><circle cx="27.333" cy="3.686" r="2.72" /><circle cx="39.369" cy="3.686" r="2.72" /><circle
                      cx="51.405" cy="3.686" r="2.72" /><circle cx="63.441" cy="3.686" r="2.72" /><circle cx="75.479" cy="3.686"
                        r="2.72" /><circle cx="87.514" cy="3.686" r="2.719" /></g><g transform="translate(0 49)"><circle cx="3.261"
                          cy="2.767" r="2.72" /><circle cx="15.296" cy="2.767" r="2.719" /><circle cx="27.333" cy="2.767" r="2.72" /><circle
                      cx="39.369" cy="2.767" r="2.72" /><circle cx="51.405" cy="2.767" r="2.72" /><circle cx="63.441" cy="2.767"
                        r="2.72" /><circle cx="75.479" cy="2.767" r="2.72" /><circle cx="87.514" cy="2.767" r="2.719" /></g><g
                          transform="translate(0 61)"><circle cx="3.261" cy="2.846" r="2.72" /><circle cx="15.296" cy="2.846"
                            r="2.719" /><circle cx="27.333" cy="2.846" r="2.72" /><circle cx="39.369" cy="2.846" r="2.72" /><circle
                      cx="51.405" cy="2.846" r="2.72" /><circle cx="63.441" cy="2.846" r="2.72" /><circle cx="75.479" cy="2.846"
                        r="2.72" /><circle cx="87.514" cy="2.846" r="2.719" /></g><g transform="translate(0 73)"><circle cx="3.261"
                          cy="2.926" r="2.72" /><circle cx="15.296" cy="2.926" r="2.719" /><circle cx="27.333" cy="2.926" r="2.72" /><circle
                      cx="39.369" cy="2.926" r="2.72" /><circle cx="51.405" cy="2.926" r="2.72" /><circle cx="63.441" cy="2.926"
                        r="2.72" /><circle cx="75.479" cy="2.926" r="2.72" /><circle cx="87.514" cy="2.926" r="2.719" /></g><g
                          transform="translate(0 85)"><circle cx="3.261" cy="3.006" r="2.72" /><circle cx="15.296" cy="3.006"
                            r="2.719" /><circle cx="27.333" cy="3.006" r="2.72" /><circle cx="39.369" cy="3.006" r="2.72" /><circle
                      cx="51.405" cy="3.006" r="2.72" /><circle cx="63.441" cy="3.006" r="2.72" /><circle cx="75.479" cy="3.006"
                        r="2.72" /><circle cx="87.514" cy="3.006" r="2.719" /></g></g></g></g></svg>
              <svg viewBox="0 0 91 91" className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-pink-500
            fill-current"><g stroke="none" strokeWidth="1" fillRule="evenodd"><g fillRule="nonzero"><g><g><circle
                  cx="3.261" cy="3.445" r="2.72" /><circle cx="15.296" cy="3.445" r="2.719" /><circle cx="27.333" cy="3.445"
                    r="2.72" /><circle cx="39.369" cy="3.445" r="2.72" /><circle cx="51.405" cy="3.445" r="2.72" /><circle cx="63.441"
                      cy="3.445" r="2.72" /><circle cx="75.479" cy="3.445" r="2.72" /><circle cx="87.514" cy="3.445" r="2.719" /></g><g
                        transform="translate(0 12)"><circle cx="3.261" cy="3.525" r="2.72" /><circle cx="15.296" cy="3.525"
                          r="2.719" /><circle cx="27.333" cy="3.525" r="2.72" /><circle cx="39.369" cy="3.525" r="2.72" /><circle
                      cx="51.405" cy="3.525" r="2.72" /><circle cx="63.441" cy="3.525" r="2.72" /><circle cx="75.479" cy="3.525"
                        r="2.72" /><circle cx="87.514" cy="3.525" r="2.719" /></g><g transform="translate(0 24)"><circle cx="3.261"
                          cy="3.605" r="2.72" /><circle cx="15.296" cy="3.605" r="2.719" /><circle cx="27.333" cy="3.605" r="2.72" /><circle
                      cx="39.369" cy="3.605" r="2.72" /><circle cx="51.405" cy="3.605" r="2.72" /><circle cx="63.441" cy="3.605"
                        r="2.72" /><circle cx="75.479" cy="3.605" r="2.72" /><circle cx="87.514" cy="3.605" r="2.719" /></g><g
                          transform="translate(0 36)"><circle cx="3.261" cy="3.686" r="2.72" /><circle cx="15.296" cy="3.686"
                            r="2.719" /><circle cx="27.333" cy="3.686" r="2.72" /><circle cx="39.369" cy="3.686" r="2.72" /><circle
                      cx="51.405" cy="3.686" r="2.72" /><circle cx="63.441" cy="3.686" r="2.72" /><circle cx="75.479" cy="3.686"
                        r="2.72" /><circle cx="87.514" cy="3.686" r="2.719" /></g><g transform="translate(0 49)"><circle cx="3.261"
                          cy="2.767" r="2.72" /><circle cx="15.296" cy="2.767" r="2.719" /><circle cx="27.333" cy="2.767" r="2.72" /><circle
                      cx="39.369" cy="2.767" r="2.72" /><circle cx="51.405" cy="2.767" r="2.72" /><circle cx="63.441" cy="2.767"
                        r="2.72" /><circle cx="75.479" cy="2.767" r="2.72" /><circle cx="87.514" cy="2.767" r="2.719" /></g><g
                          transform="translate(0 61)"><circle cx="3.261" cy="2.846" r="2.72" /><circle cx="15.296" cy="2.846"
                            r="2.719" /><circle cx="27.333" cy="2.846" r="2.72" /><circle cx="39.369" cy="2.846" r="2.72" /><circle
                      cx="51.405" cy="2.846" r="2.72" /><circle cx="63.441" cy="2.846" r="2.72" /><circle cx="75.479" cy="2.846"
                        r="2.72" /><circle cx="87.514" cy="2.846" r="2.719" /></g><g transform="translate(0 73)"><circle cx="3.261"
                          cy="2.926" r="2.72" /><circle cx="15.296" cy="2.926" r="2.719" /><circle cx="27.333" cy="2.926" r="2.72" /><circle
                      cx="39.369" cy="2.926" r="2.72" /><circle cx="51.405" cy="2.926" r="2.72" /><circle cx="63.441" cy="2.926"
                        r="2.72" /><circle cx="75.479" cy="2.926" r="2.72" /><circle cx="87.514" cy="2.926" r="2.719" /></g><g
                          transform="translate(0 85)"><circle cx="3.261" cy="3.006" r="2.72" /><circle cx="15.296" cy="3.006"
                            r="2.719" /><circle cx="27.333" cy="3.006" r="2.72" /><circle cx="39.369" cy="3.006" r="2.72" /><circle
                      cx="51.405" cy="3.006" r="2.72" /><circle cx="63.441" cy="3.006" r="2.72" /><circle cx="75.479" cy="3.006"
                        r="2.72" /><circle cx="87.514" cy="3.006" r="2.719" /></g></g></g></g></svg>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Signup