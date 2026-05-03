import { MessageCircleMore } from 'lucide-preact';

export default function ChatButton({onClick, isOpen}) {
    return (
        <button className='chat-button' onClick={onClick}>
            <MessageCircleMore size={24} color='white'></MessageCircleMore>
        </button>
    )

}