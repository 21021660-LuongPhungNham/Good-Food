import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routers/foodRoute.js"
import userRouter from "./routers/userRouter.js"
import cartRouter from "./routers/cartRouter.js"
import dotenv from "dotenv"
import 'dotenv/config'
import orderRouter from "./routers/orderRouter.js"
import configViewEngine from "./config/viewEngine.js"
import initWebRouter from "./routers/web.js"
import homepageController from "./controllers/homepageController.js"
import bodyParser from "body-parser"

// app config
const app = express()
const port = 4000

//config view engine
configViewEngine(app)

//init all web routes
initWebRouter(app)

//middleware
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

// db connect
connectDB();

// api endpoint
app.use("/api/food", foodRouter)

app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)


app.get("/", (req, res) => {
    res.send("API work")
})

app.listen(port, () => {
    console.log(`Server start on http://localhost:${port}`)
})
