import React from "react"
import "./Overlay.css"

function Overlay({ icon, title, position, secondaryTitle, body }) {
  return (
    <div className="overlay">
      <div className="overlay-content">
        <button className="close-button">X</button>
        <img src={icon} alt={`${icon}-alt`} className="overlay-icon" />
        <h1>{title}</h1>
        <h3>{position}</h3>
        <h3>{secondaryTitle}</h3>
        <div className="overlay-body">{body}</div>
      </div>
    </div>
  )
}

export default Overlay
