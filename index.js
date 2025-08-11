import express, { urlencoded } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import route from "./routes/order.route.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(urlencoded({urlencoded: true}))

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use('/order', route)

mongoose.connect(MONGO_URI).then( () =>  {
    console.log("Database connected successfully");
    app.listen(PORT, () =>{
        console.log("PORT is connected on", PORT);
    })
}).catch( (error) => {
    console.error(error);
    
})
