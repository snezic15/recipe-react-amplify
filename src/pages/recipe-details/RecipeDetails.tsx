import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from "./RecipeDetails.module.css"
import Header from "../header/Header"
import Footer from "../footer/Footer"
import NotFound from "../not-found/NotFound"
import { Recipe } from "../../interfaces/recipe"
import {
  fetchRecipeImageUrl,
  fetchRecipeText,
} from "../../requests/getRecipeData"

function RecipeDetails() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined)
  const [image, setImage] = useState<string | undefined>(undefined)

  useEffect(() => {
    async function fetchRecipeData() {
      const cachedText = sessionStorage.getItem(`${id}-text`)
      if (cachedText) {
        setRecipe(JSON.parse(cachedText))
      } else {
        if (id) {
          const fetchedText = await fetchRecipeText(id)
          setRecipe(JSON.parse(fetchedText))
          sessionStorage.setItem(`${id}-text`, fetchedText)
        }
      }
    }

    fetchRecipeData()
  }, [id])

  useEffect(() => {
    async function fetchRecipeImage() {
      const cachedImageUrl = sessionStorage.getItem(`${id}-image`)
      if (cachedImageUrl) {
        setImage(cachedImageUrl)
      } else {
        if (id) {
          const fetchedImageUrl = await fetchRecipeImageUrl(id)
          setImage(fetchedImageUrl)
          sessionStorage.setItem(`${id}-image`, fetchedImageUrl)
        }
      }
    }

    fetchRecipeImage()
  }, [id])

  return recipe ? (
    <div className={styles.recipePage}>
      <Header />
      <main className={styles.recipeContainer}>
        <h1 className={styles.recipeTitle}>{recipe.name}</h1>
        <p className={styles.recipeServes}>Serves: {recipe.serves}</p>

        <img src={image} alt={recipe.name} className={styles.recipeImage} />

        <p className={styles.recipeDescription}>{recipe.description}</p>

        <hr className={styles.divider} />

        <div className={styles.recipeContent}>
          <div className={styles.dividerVertical}></div>
          <div className={styles.ingredients}>
            <h2 className={styles.sectionTitle}>Ingredients</h2>
            {recipe.ingredients.map((section) => (
              <div key={section.section} className={styles.ingredientSection}>
                <h3 className={styles.sectionHeader}>{section.section}</h3>
                <ul>
                  {section.ingredients.map((ingredient) => (
                    <li key={ingredient.name} className={styles.ingredient}>
                      {ingredient.quantity} {ingredient.unit} {ingredient.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <hr className={styles.dividerContent} />

          <div className={styles.method}>
            <h2 className={styles.sectionTitle}>Method</h2>
            <ol className={styles.methodSteps}>
              {recipe.method.map((step, index) => (
                <li key={index} className={styles.methodStep}>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  ) : (
    <NotFound />
  )
}

export default RecipeDetails
