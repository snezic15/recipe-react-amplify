import React, { useEffect } from "react"
import { useState } from "react"
import styles from "./Homepage.module.css"
import Carousel from "../../components/carousel/Carousel"
import Header from "../header/Header"
import Footer from "../footer/Footer"
import { fetchRecipesCardData } from "../../requests/getRecipeData"
import { RecipeCards } from "../../interfaces/recipe"

function Homepage() {
  const [recipe, setRecipe] = useState<RecipeCards>([])

  useEffect(() => {
    async function setCarouselRecipes() {
      const recipes: RecipeCards = (await fetchRecipesCardData(100)) || []

      if (recipes) {
        if (recipes.length > 5) {
          const randomIndexes = new Set<number>()
          while (randomIndexes.size < 5) {
            const randomIndex = Math.floor(Math.random() * recipes.length)
            randomIndexes.add(randomIndex)
          }
          const randomRecipes = Array.from(randomIndexes).map(
            (index) => recipes[index]
          )
          setRecipe(randomRecipes)
        } else {
          setRecipe(recipes)
        }
      }
    }

    setCarouselRecipes()
  }, [])

  return (
    <div className={styles.homepage}>
      <Header />
      <main>
        <section className={styles.welcomeSection}>
          <div className={styles.welcomeContainer}>
            <h1>Welcome to the website!</h1>
            <p>Sample text</p>
            <div className={styles.buttonContainer}>
              <button className={styles.joinButton}>JOIN NOW</button>
              <button className={styles.loginButton}>LOG IN</button>
            </div>
          </div>
        </section>

        <section className={styles.featuredRecipes}>
          <h2>Try something new!</h2>
          <Carousel recipes={recipe} />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Homepage
