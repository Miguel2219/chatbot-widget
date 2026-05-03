import { useRef, useEffect } from "preact/hooks"
import Message from "./Message"
import { X, Send } from 'lucide-preact';

export default function ChatWindow({ messages, botTyping, handleSendMessage, handleToggle, botName }) {
    const inputRef = useRef(null)
    const bottomRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView()
    }, [messages])

    return (
        <div className="chat-window">
            <div className="chat-header">
                <div className="chat-avatar">{botName ? botName.charAt(0).toUpperCase() : 'A'}</div>
                <div className="chat-header-text">
                    <h3>{botName ? botName : 'Assistant'}</h3>
                    <p>En linea</p>
                </div>
                <button className="chat-close-btn" onClick={handleToggle}>
                    <X size={24} color="white"></X>
                </button>
            </div>
            <div className="chat-messages">
                {messages.map(msg => (
                    <Message
                        key={msg.id}
                        role={msg.role}
                        content={msg.content}
                        botName={botName}
                    ></Message>
                ))}
                {botTyping &&
                    <div className="typing-indicator">
                        <div className="chat-avatar small">{botName ? botName.charAt(0).toUpperCase() : 'A'}</div>
                        <div className="typing-dots">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                }
                <div ref={bottomRef}></div>
            </div>
            <div className="chat-input-area">
                <input ref={inputRef} type="text" placeholder="Escribe tu mensaje..." />
                <button className="send-button" onClick={() => {
                    handleSendMessage(inputRef.current.value)
                    inputRef.current.value = ""
                }}><Send size={18} color="white"></Send></button>
            </div>
            <div className="chat-footer">
                Powered by BotAI Colombia
            </div>
        </div>
    )
}