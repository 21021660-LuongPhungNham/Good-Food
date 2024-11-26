import { useState } from "react";
import axios from "axios";
import "./ChatBot.css"; // Import CSS

const Chatbot = () => {
    const [messages, setMessages] = useState([]); // Tin nhắn
    const [input, setInput] = useState("");       // Tin nhắn nhập
    const [isChatOpen, setIsChatOpen] = useState(false); // Trạng thái mở/đóng chat

    const handleSend = async () => {
        if (!input.trim()) return;

        // Tin nhắn từ người dùng
        const userMessage = { sender: "user", text: input };
        setMessages([...messages, userMessage]); // Cập nhật tin nhắn người dùng

        try {
            // Gửi yêu cầu tới backend
            const response = await axios.post("http://localhost:4000/api/chat", { message: input });

            // Tin nhắn phản hồi từ bot
            const botMessage = { sender: "bot", text: response.data.reply };
            setMessages((prevMessages) => [...prevMessages, botMessage]); // Cập nhật tin nhắn bot
        } catch (error) {
            console.error("Error:", error);
        }

        setInput(""); // Xóa input sau khi gửi
    };

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen); // Đóng/mở chat
    };

    return (
        <div>
            {/* Biểu tượng chatbot hình tròn */}
            <div className="chatbot-icon" onClick={toggleChat}>
                <i className="fas fa-comments"></i>
            </div>

            {/* Chatbox hiển thị khi mở */}
            {isChatOpen && (
                <div className="chatbot-container">
                    <div className="chatbox">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                <strong className="sender">
                                    {msg.sender === "user" ? "You" : "Bot"}:
                                </strong>{" "}
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="chat-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button onClick={handleSend}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
