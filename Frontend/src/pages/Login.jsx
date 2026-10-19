import { useState } from "react";
import { loginUser } from "../services/authApi";

const Login = ({onLoginSuccess}) =>{

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) =>{
        e.preventDefault();

       try{
        const response = await loginUser({
            email,
            password,
        });
        console.log("login succssfull",response.data);
        onLoginSuccess();
       }
       catch(error){
        console.error("login failed",error);
        
       }
    

    }


    return(
        <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
            <h1 className="mb-2 text-center text-3xl font-bold text-slate-800">
  Employee Management System
</h1>
<p className="mb-6 text-center text-sm text-slate-500">
  Sign in to access your dashboard
</p>

            <form onSubmit={handleSubmit}>

                <input type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className="mb-4 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-blue-100" 
                  />

                  <input type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value) }
                  className="mb-4 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-blue-100"
                  />

                  <button type="submit" className="w-full rounded-lg bg-red-400 px-5 py-3 font-semibold text-white transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Login</button>
            </form>
        </div>
        </div>
    )
}

export default Login;