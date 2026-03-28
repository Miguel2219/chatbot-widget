import {render} from 'preact'
import Widget from './Widget'

const botId = 'your-bot-uuid-here'
const apiUrl = 'http://localhost:8080'
/* const scriptTag = document.currentScript
const botId = scriptTag?.getAttribute('data-bot-id')
const apiUrl = scriptTag?.getAttribute('data-api-url') || 'http://localhost:8080'
 */
if (!botId) {
    console.error('Chatbot widget: data-bot-id is required')
} else {
    const container = document.createElement('div')
    container.id = 'chatbot-widget-root'
    document.body.appendChild(container)

    render (<Widget botId={botId} apiUrl={apiUrl} />, container)
}