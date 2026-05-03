export default function Message({role, content, botName}) {
    const isUser = role === 'user'  

    return(
        <div className={`message-wrapper ${role}`}>
            {isUser ? <span className="message-label">You</span> : <div className="chat-avatar small">{botName ? botName.charAt(0).toUpperCase() : 'A'}</div>}
            <div className="message-bubble"> 
            {content}
            </div>
        </div>
    )
}