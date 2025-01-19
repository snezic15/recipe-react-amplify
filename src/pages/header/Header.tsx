import React, { useState, useEffect, useRef } from "react"
import HamburgerMenu from "../../components/hamburger-menu/HamburgerMenu"
import styles from "./Header.module.css"

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className={styles.header}>
      <div ref={menuRef}>
        <HamburgerMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>

      {/* Search Bar (Always visible) */}
      <input type="text" placeholder="Search" className={styles.searchBar} />

      {/* Profile Icon */}
      <div className={styles.profileIcon}></div>
    </header>
  )
}

export default Header
