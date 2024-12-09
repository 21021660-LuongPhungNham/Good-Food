import express from 'express';
import axios from 'axios'; // Cài đặt axios để gọi API Gemini
import dotenv from 'dotenv';

dotenv.config(); // Đọc API key từ file .env

const chatRouter = express.Router();

// Lấy API Key từ biến môi trường
const apiKey = process.env.GEMINI_API_KEY;

// Endpoint để xử lý chat
chatRouter.post('/', async (req, res) => {
const { message } = req.body;
console.log(message);

if (!message) {
return res.status(400).json({ error: 'Message is required' });
}

const requestBody = {
contents: [
{
parts: [
{
text: message,
},
],
},
],
};
console.log("request:" + requestBody);

try {
const response = await axios.post(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
requestBody,
{
headers: {
'Content-Type': 'application/json',
},
}
);

// Log toàn bộ response để kiểm tra nội dung
//console.log("Full response:", response.data);

// Log phần nội dung mà bạn cần từ response
const reply = response.data.candidates[0]?.content?.parts[0]?.text || "No response content";
//console.log("Reply from Gemini:", reply);

res.json({ reply });

} catch (error) {
console.error("Error details:", error.response ? error.response.data : error.message);
res.status(500).json({ error: 'Something went wrong' });
}
});

export default chatRouter;