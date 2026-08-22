import { useState, useRef, useEffect } from 'preact/hooks'
import ChatButton from './components/ChatButton'
import ChatWindow from './components/ChatWindow'
import { generateSessionId, getBot, sendMessage } from './api/chatApi'

export default function Widget({ botId, apiUrl }) {
    const [isOpen, setIsOpen] = useState(false)
    const [botTyping, setBotTyping] = useState(false)
    const [messages, setMessages] = useState([])
    const sessionId = useRef(generateSessionId())
    const [botName, setBotName] = useState('')

    useEffect(() => {
        const fetchBotName = async () => {
            const data = await getBot(apiUrl, botId)
            setBotName(data.name)
        }
        if (botId) fetchBotName()
    }, [botId])

    function handleToggle() {
        setIsOpen(!isOpen)
    }

    async function handleSendMessage(text) {
        setMessages(prev => [...prev, { role: "user", content: text, id: crypto.randomUUID()}])
        setBotTyping(true)
        try {
            const data = await sendMessage(apiUrl, botId, sessionId.current, text)
            setMessages(prev => [...prev, { role: "assistant", content: data.response, id: crypto.randomUUID() }])
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
                botName={botName}
            />}
            <ChatButton
               onClick={handleToggle} 
               isOpen = {isOpen}
            />
        </div>
    )
}

