import { useState } from "react";
import axios from "axios";
import "./ChatBot.css"; // Import CSS

const Chatbot = () => {
    const [messages, setMessages] = useState([]); // Tin nhắn
    const [input, setInput] = useState("");       // Tin nhắn nhập
    const [isChatOpen, setIsChatOpen] = useState(false); // Trạng thái mở/đóng chat

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages([...messages, userMessage]);

        try {
            const response = await axios.post("http://localhost:4000/api/chat", { message: input });
            const botMessage = { sender: "bot", text: response.data.reply };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error("Error:", error);
        }

        setInput("");
    };

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <div>
            {/* Biểu tượng Messenger */}
            <div className="chatbot-icon" onClick={toggleChat}>
                <i className="fab fa-facebook-messenger"></i>
            </div>

            {/* Chatbox */}
            {isChatOpen && (
                <div className="chatbot-container">
                    <div className="chatbox">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                <span className="sender">
                                    {msg.sender === "user" ? "You" : "Bot"}:
                                </span>{" "}
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
                        <button onClick={handleSend}>
                            <i className="fas fa-send"></i> Send
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
