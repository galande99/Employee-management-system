const dotenv = require("dotenv")

dotenv.config();


const app = require("./src/app")
const connectDb = require("./src/config/db")

connectDb()

app.listen(3000,()=>{
    console.log("server running n port 3000")
})