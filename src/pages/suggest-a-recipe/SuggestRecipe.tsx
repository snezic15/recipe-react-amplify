import Header from "../header/Header"
import Footer from "../footer/Footer"
import styles from "./SuggestRecipe.module.css"
import React, { useState } from "react"
import type { Schema } from "../../../amplify/data/resource"
import { generateClient } from "aws-amplify/data"
import testRecipe from "../../temp/recipe-1.json"
import IngredientsSection from "../../components/ingredients-section/IngredientsSection"

function SuggestRecipe() {
  const client = generateClient<Schema>()
  let recipeId = ""
  const [ingredientsSections, setIngredientsSections] = useState([
    {
      sectionName: "",
      ingredients: [{ quantity: "", measurement: "", name: "" }],
    },
  ])

  const createData = async () => {
    const temp = await client.models.Recipes.create({
      name: "Spaghetti Bolognese",
      isActive: true,
      recipeContent: JSON.stringify(testRecipe),
    })

    if (temp.data) {
      recipeId = temp.data.id
    } else {
      window.alert("Failed to create recipe")
    }
  }

  const processFile = async ({ file }) => {
    return { file, key: `${recipeId}.jpg` }
  }

  return (
    <div className={styles.submitRecipePage}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Submit a Recipe!</h1>

        <form className={styles.recipeForm}>
          <div className={styles.formGroup}>
            <label htmlFor="recipeName" className={styles.label}>
              Recipe Name
            </label>
            <input
              type="text"
              id="recipeName"
              name="recipeName"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="serves" className={styles.label}>
              Serves
            </label>
            <select id="serves" name="serves" className={styles.select}>
              {[...Array(10).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="recipeDescription" className={styles.label}>
              Recipe Description
            </label>
            <textarea
              id="recipeDescription"
              name="recipeDescription"
              className={styles.textarea}
            ></textarea>
          </div>

          {/* Method sections will go here later */}
          <IngredientsSection
            ingredientsSections={ingredientsSections}
            setIngredientsSections={setIngredientsSections}
          />

          <div className={styles.formGroup}>
            <label htmlFor="imageUpload" className={styles.label}>
              Image Upload
            </label>
            <input
              type="file"
              id="imageUpload"
              name="imageUpload"
              accept="image/*"
              className={styles.fileInput}
            />
          </div>
          <div className={styles.formGroup}>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  )
}

export default SuggestRecipe
