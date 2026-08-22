# chatbot-widget

An embeddable chat widget built with Preact. A business drops a single `<script>`
tag into their website and a floating chat button appears, connected to their bot
on the backend. It's the customer-facing front end of a multi-tenant chatbot
platform.

Part of a four-service platform: a
[Spring Boot backend](https://github.com/Miguel2219/chatbot-saas-backend),
a [Python RAG microservice](https://github.com/Miguel2219/chatbot-service-rag),
an [Angular admin panel](https://github.com/Miguel2219/chatbot-panel), and this widget.

## Stack

- **Preact** — same component/hooks API as React, in a ~3KB runtime
- **Vite** — build tooling
- **vite-plugin-css-injected-by-js** — bundles CSS into the JS so the whole
  widget ships as a single file
- **lucide-preact** — icons

## How it embeds

The widget is designed to load from one script tag, with no build step on the
host site:

```html
<script
  src="https://your-cdn/widget.js"
  data-bot-id="the-bot-id"
  data-api-url="https://your-backend/app">
</script>
```

`main.jsx` reads `data-bot-id` and `data-api-url` from the script tag itself,
creates its own container element, and mounts the Preact app into it. Because the
CSS is injected by the JS bundle, nothing else needs to be added to the page.

## Design notes

**Session handling.** Each visitor gets a client-generated session ID
(`session_<uuid>`) created once per page load and kept in a ref, so every message
in a conversation is tied to the same session without persisting anything
sensitive in the browser.

**The widget only ever calls public endpoints.** To render, it needs the bot's
display name, so it calls a dedicated public endpoint
(`/api/bot/get_widget_bot/{botId}`) that returns only what the widget needs. It
deliberately does **not** call the panel's authenticated bot endpoint, which
returns sensitive data (system prompt, tenant ID, lead assignees). Keeping that
boundary in the client is intentional: a public widget should never be able to
reach data meant for the authenticated dashboard.

**Component structure.** `Widget` owns the state (open/closed, messages, typing
indicator) and passes it down to presentational components: `ChatButton`,
`ChatWindow` and `Message`. The API layer (`api/chatApi.js`) is kept separate
from the components, so the data-fetching logic is isolated from the UI.

## Project structure

```
src/
├── Widget.jsx            # top-level state and orchestration
├── main.jsx              # entry point: reads script-tag config, mounts the app
├── components/
│   ├── ChatButton.jsx    # floating open/close button
│   ├── ChatWindow.jsx    # the chat panel
│   └── Message.jsx       # a single message bubble
├── api/
│   └── chatApi.js        # backend calls (send message, get bot, session id)
└── styles/
    └── widget.css
```

## Running locally

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and set `VITE_API_URL` to your backend, or pass
`data-api-url` on the script tag when embedding.

Build the single-file bundle:

```bash
npm run build
```
