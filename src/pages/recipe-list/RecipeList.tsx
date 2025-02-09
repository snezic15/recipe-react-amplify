import React, { useEffect, useMemo } from "react"
import { useState } from "react"
import styles from "./RecipeList.module.css"
import Header from "../header/Header"
import Footer from "../footer/Footer"
import RecipeCard from "../../components/recipe-card/RecipeCard"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { RecipeCards } from "../../interfaces/recipe"
import {
  fetchRecipeImageUrl,
  fetchRecipesCardData,
} from "../../requests/getRecipeData"

function RecipeList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [recipesPerPage, setRecipesPerPage] = useState(9)
  const [recipe, setRecipe] = useState<RecipeCards>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function setCarouselRecipes() {
      const recipes: RecipeCards = (await fetchRecipesCardData(100)) || []

      if (recipes) {
        const enrichedRecipes = await Promise.all(
          recipes.map(async (recipe) => ({
            ...recipe,
            imageUrl: await fetchRecipeImageUrl(recipe.id),
          }))
        )

        setRecipe(enrichedRecipes)
      }
    }

    setCarouselRecipes()
  }, [])

  const filteredRecipes = useMemo(() => {
    return recipe.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [recipe, searchQuery])

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage)

  useEffect(() => {
    const handleResize = () => {
      let newRecipesPerPage
      if (window.innerWidth < 768) {
        newRecipesPerPage = 4
      } else if (window.innerWidth < 1024) {
        newRecipesPerPage = 6
      } else {
        newRecipesPerPage = 9
      }

      setRecipesPerPage(newRecipesPerPage)

      // Reset currentPage if it's out of bounds to first page
      const newTotalPages = Math.ceil(recipe.length / newRecipesPerPage)
      if (currentPage > newTotalPages) {
        setCurrentPage(1)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [currentPage, recipe.length])

  const indexOfLastRecipe = currentPage * recipesPerPage
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  )

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
    setCurrentPage(1)
  }

  return (
    <div className={styles.recipeList}>
      <Header />
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Choose Your Recipe!</h1>
        <input
          type="text"
          placeholder="Search for recipes..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles.searchBar}
        />

        <div className={styles.recipeGrid}>
          {currentRecipes.length > 0 ? (
            currentRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                imageSrc={recipe.imageUrl}
                imageAlt={recipe.name}
                recipeName={recipe.name}
                recipeId={recipe.id}
              />
            ))
          ) : (
            <p className={styles.noResults}>No recipes found.</p>
          )}
        </div>

        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            onClick={goToPrevPage}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={`${styles.pageButton} ${
                currentPage === i + 1 ? styles.activePage : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            className={styles.pageButton}
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </button>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default RecipeList
