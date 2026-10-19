 import axios from "axios";

 const api = axios.create({
   baseURL: "https://employee-management-system-bucc.onrender.com",
   withCredentials: true,
 });


 export default api;