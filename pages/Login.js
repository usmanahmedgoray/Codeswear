/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React,{useEffect, useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
// Add the Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/")
    }
  }, [])
  

  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password }
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      // console.log("Success:", result);
      // Add the toastify
      if(result.success === "true"){
        localStorage.setItem("token",result.token)
        toast.success('You logged in successfully', {
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
        toast.error('Please! enter the correct credentials', {
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
    setEmail('');
    setPassword('');


  }
  return (
    <div>
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
      <div className="flex h-full w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499123785106-343e69e68db1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80')" }}>
        <div className="rounded-xl bg-pink-500 bg-opacity-50 px-16 py-3 shadow-lg backdrop-blur-md max-sm:px-8 my-6">
          <div className="">
            <div className="mb-8 flex flex-col items-center">
              <img src="/logo.png" width="115" alt="" srcSet=""  className='my-2'/>
              <h1 className="mb-2 text-3xl font-bold">Login</h1>
              <span className="text-white text-xs">or <Link href="/Signup" className='text-pink-600 underline text-sm'>Signup</Link> for new account</span>
            </div>
            <form>
              <div className="mb-4 text-lg flex flex-col">
                <label htmlFor="email" className='my-2 mx-2 text-white'>Email</label>
                <input className="rounded-xl border-none bg-opacity-50 px-6 py-2 shadow-lg outline-none backdrop-blur-md placeholder:text-lg" type="text" name="email" id='email' placeholder="e.g. example@gmail.com" onChange={handleChange} value={email} />
              </div>

              <div className="mb-4 text-lg flex flex-col">
                <label htmlFor="password" className='my-2 mx-2 text-white'>Password</label>
                <input className="rounded-xl border-none  bg-opacity-50 px-6 py-2 shadow-lg outline-none backdrop-blur-md placeholder:text-lg" type="Password" name="password" id='password' placeholder="e.g. 12345678" onChange={handleChange} value={password}/>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <div className='text-xs select-none'>
                  <Link href={"/Forget"} className='text-pink-950 underline text-xs'>
                  Forget the password?
                  </Link>
                </div>
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <button type="submit" className="rounded-3xl bg-pink-600 bg-opacity-50 px-10 py-2 text-white shadow-xl transition-colors duration-300 hover:bg-pink-900 mb-6" onClick={handleSubmit} >Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login