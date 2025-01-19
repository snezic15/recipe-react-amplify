import React from "react"
import PropTypes from "prop-types"
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

Overlay.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  position: PropTypes.string,
  secondaryTitle: PropTypes.string.isRequired,
  body: PropTypes.node.isRequired,
}

export default Overlay
