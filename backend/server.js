import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routers/foodRoute.js";
import userRouter from "./routers/userRouter.js";
import cartRouter from "./routers/cartRouter.js";
import dotenv from "dotenv";
import 'dotenv/config';
import orderRouter from "./routers/orderRouter.js";
import axios from "axios"; // Thêm axios để gọi API OpenAI

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Thêm URL của frontend tại đây
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// app.use(express.urlencoded({ extended: true }));

// db connect
connectDB();

// api endpoint
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Thêm endpoint mới để giao tiếp với ChatGPT
app.post("/api/chat", async (req, res) => {
    const userMessage = req.body.message;
    const apiKey = process.env.OPENAI_API_KEY;

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [{ role: "user", content: userMessage }],
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        );

        // Log dữ liệu phản hồi từ OpenAI để kiểm tra
        console.log(response.data);

        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
});


app.get("/", (req, res) => {
    res.send("API work");
});

app.listen(port, () => {
    console.log(`Server start on http://localhost:${port}`);
});
