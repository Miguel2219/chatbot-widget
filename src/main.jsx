import {render} from 'preact'
import Widget from './Widget'
import './styles/widget.css'


const scriptTag = document.currentScript
const botId = scriptTag?.getAttribute('data-bot-id')
const apiUrl = scriptTag?.getAttribute('data-api-url') || import.meta.env.VITE_API_URL || 'http://localhost:8000/app'

if (!botId || !apiUrl) {
    console.error('Chatbot widget: data-bot-id and data-api-url are required')
} else {
    const container = document.createElement('div')
    container.id = 'chatbot-widget-root'
    document.body.appendChild(container)

    render (<Widget botId={botId} apiUrl={apiUrl} />, container)
}