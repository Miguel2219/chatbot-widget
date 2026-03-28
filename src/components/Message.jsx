export default function Message({role, text}) {
    const isUser = role === 'USER'
    return(
        <div style={{
            display: 'flex',
            justifyContent: isUser? 'flex-end' : 'flex-start',
            marginBottom: '8px',
            gap: '6px',
            borderRadius: '8px'
        }}>
            <div style={{
                background: isUser? '#007bff' : '#f0f0f0'
            }}>
            </div>
        </div>
    )
}