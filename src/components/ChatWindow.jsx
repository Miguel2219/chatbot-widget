import { useRef } from "preact/hooks"

export default function ChatWindow({ messages, botTyping, handleSendMessage, handleToggle }) {
    const inputRef = useRef(null)

    return (
        <div>
            <div className="header">
                <div className="Profile">A</div>
                <div className="header-text">
                    <h3>Asistente Virtual</h3>
                    <p>En linea</p>
                </div>
                <div className="buttons-header">
                    <button onClick={handleToggle}>
                        <em className="icon-close"></em>
                    </button>
                </div>
            </div>
            <div className="messages">
                {messages.map(msg => (
                    <div key={msg.id}>
                        <p className="msg">{msg.content}</p>
                        <p className="time">12:16 p.m.</p>
                    </div>
                ))}
                {botTyping && <p className="msg">...</p>}
            </div>
            <div>
                <input ref={inputRef} type="text" placeholder="Escribe tu mensaje..." />
                <button className="send-button" onClick={() => {handleSendMessage(inputRef.current.value)
                    inputRef.current.value = ""
                }}>Send</button>
            </div>
            <div>
                Powered by BotAI Colombia
            </div>
        </div>
    )
}