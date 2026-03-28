export default function ChatButton({onClick, isOpen}) {
    return (
        <button onClick={onClick}>{isOpen ? 'Ocultar' : 'Mostrar'}</button>
    )
}