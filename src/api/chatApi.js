export async function sendMessage(apiUrl, botId, sessionId, message) {
    const response = await fetch(`${apiUrl}/api/chat`, {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            bot_id: botId,
            session_id: sessionId,
            message: message
        })
    })

    if (!response.ok) {
        throw new Error(`Error ${response.status}`)
    }

    return await response.json()
}

export function generateSessionId() {
    return 'session_' + crypto.randomUUID()
}