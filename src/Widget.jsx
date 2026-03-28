import { useState, useRef } from 'preact/hooks'
import ChatButton from './components/ChatButton'
import ChatWindow from './components/ChatWindow'
import { generateSessionId, sendMessage } from './api/chatApi'

export default function Widget({ botId, apiUrl }) {
    const [isOpen, setIsOpen] = useState(false)
    const [botTyping, setBotTyping] = useState(false)
    const [messages, setMessages] = useState([])
    const sessionId = useRef(generateSessionId())

    function handleToggle() {
        setIsOpen(!isOpen)
    }

    async function handleSendMessage(text) {
        setMessages(prev => [...prev, { role: "user", content: text, id: crypto.randomUUID()}])
        setBotTyping(true)
        try {
            const data = await sendMessage(apiUrl, botId, sessionId.current, text)
            setMessages(prev => [...prev, { role: "assistant", content: data.message, id: crypto.randomUUID() }])
        } catch (error) {
            console.error(error)  
        } finally {
            setBotTyping(false)
        }
    }

    return (
        <div>
            {isOpen && <ChatWindow
                messages={messages}
                botTyping={botTyping}
                handleSendMessage={handleSendMessage}
                handleToggle={handleToggle}
            />}
            <ChatButton
               onClick={handleToggle} 
               isOpen = {isOpen}
            />
        </div>
    )
}

