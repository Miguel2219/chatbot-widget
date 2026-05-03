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

export async function getBot(apiUrl, botId) {
    // Endpoint público — devuelve solo lo mínimo que el widget necesita
    // para renderizar (hoy: { name }). NO usar /api/bot/{botId} acá,
    // ese es el endpoint autenticado del panel y devuelve datos
    // sensibles (system_prompt, tenant_id, lead_assignees).
    const response = await fetch(`${apiUrl}/api/bot/get_widget_bot/${botId}` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    const data = await response.json();
    return data
}