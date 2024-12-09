import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatBotPopup.css';

const ChatBotPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isFooterInView, setIsFooterInView] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', content: input };
        setMessages([...messages, userMessage]);

        try {
            const response = await axios.post("http://localhost:4000/api/chat", { message: input });
            const botMessage = { sender: 'bot', content: response.data.reply };
            setMessages([...messages, userMessage, botMessage]);
        } catch (error) {
            window.alert(error);
            setMessages([...messages, userMessage, { sender: 'bot', content: 'Có lỗi xảy ra!' }]);
        }
        setInput('');
    };

    const checkFooterVisibility = () => {
        const footer = document.getElementById("footer");
        const rect = footer.getBoundingClientRect();
        setIsFooterInView(rect.top <= window.innerHeight);
    };

    useEffect(() => {
        window.addEventListener('scroll', checkFooterVisibility);
        return () => window.removeEventListener('scroll', checkFooterVisibility);
    }, []);

    return (
        <div className={`chatbot-wrapper ${isFooterInView ? "footer-visible" : ""}`}>
            {/* Icon chatbot */}
            <div className={`chatbot-icon ${isFooterInView ? "footer-visible" : ""}`} onClick={toggleChat}>
                💬
            </div>

            {/* Popup chat */}
            {isOpen && (
                <div className="chatbot-popup">
                    <div className="chatbot-header">
                        <h4>Chat với chúng tôi</h4>
                        <button onClick={toggleChat}>×</button>
                    </div>
                    <div className="chatbot-body">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}
                            >
                                {msg.content}
                            </div>
                        ))}
                    </div>
                    <div className="chatbot-footer">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Nhập tin nhắn..."
                        />
                        <button onClick={sendMessage}>Gửi</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBotPopup;
