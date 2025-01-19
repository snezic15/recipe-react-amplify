import React from "react"
import { Link } from "react-router-dom"
import styles from "./HamburgerMenu.module.css"

function HamburgerMenu({ isMenuOpen, toggleMenu }) {
  return (
    <div className={styles.menuContainer}>
      <button className={styles.hamburgerButton} onClick={toggleMenu}>
        <div className={`${styles.bar} ${isMenuOpen ? styles.open : ""}`}></div>
        <div className={`${styles.bar} ${isMenuOpen ? styles.open : ""}`}></div>
        <div className={`${styles.bar} ${isMenuOpen ? styles.open : ""}`}></div>
      </button>

      <div className={`${styles.menu} ${isMenuOpen ? styles.open : ""}`}>
        <div className={styles.linksContainer}>
          <Link to="/" className={styles.link}>
            Home
          </Link>
          <Link to="/all-recipes" className={styles.link}>
            View All Recipes
          </Link>
          <Link to="/suggest-recipe" className={styles.link}>
            Suggest a Recipe
          </Link>
          <Link to="/sign-in" className={styles.link}>
            Sign In/Sign Up
          </Link>
        </div>

        <div className={styles.footerText}>Website by Samuel Nezic</div>
      </div>
    </div>
  )
}

export default HamburgerMenu
