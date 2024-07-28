import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./main.css"

const rootDom = document.getElementById("root")

ReactDOM.createRoot(rootDom as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)