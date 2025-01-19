import React from "react"
import { Link } from "react-router-dom"
import styles from "./RecipeCard.module.css"

function RecipeCard({ imageSrc, imageAlt, recipeName, recipeId }) {
  return (
    <Link
      to={recipeId ? `/recipe/${recipeId}` : ""}
      className={styles.cardLink}
    >
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img src={imageSrc} alt={imageAlt} className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <p className={styles.text}>{recipeName}</p>
        </div>
      </div>
    </Link>
  )
}

export default RecipeCard
