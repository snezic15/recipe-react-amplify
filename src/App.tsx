import React from "react"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/homepage/Homepage"
import RecipeDetails from "./pages/recipe-details/RecipeDetails"
import NotFound from "./pages/not-found/NotFound"
import SuggestRecipe from "./pages/suggest-a-recipe/SuggestRecipe"
import RecipeList from "./pages/recipe-list/RecipeList"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/suggest-recipe" element={<SuggestRecipe />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/all-recipes" element={<RecipeList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
