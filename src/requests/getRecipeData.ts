import type { Schema } from "../../amplify/data/resource"
import { generateClient } from "aws-amplify/data"
import { Recipe, RecipeCards, RecipeJson } from "../interfaces/recipe"
import { getUrl } from "aws-amplify/storage"

export async function fetchRecipeImageUrl(recipeId: string) {
  try {
    const data = await getUrl({
      path: `recipeImages/${recipeId}.jpg`,
      options: {
        validateObjectExistence: true,
      },
    })

    const text = data.url.toString()
    return text
  } catch (error) {
    return "https://www.foodregulation.gov.au/sites/default/files/2024-06/food-regulation.jpg"
  }
}

export async function fetchOneRecipe(recipeId: string) {
  const client = generateClient<Schema>()
  try {
    const { data: todos } = await client.models.Recipes.get({
      id: recipeId,
    })

    if (!todos || !todos.isActive) {
      return ""
    }

    const recipeJson: RecipeJson = todos.recipeContent
      ? JSON.parse(todos.recipeContent as string)
      : {}

    const recipe: Recipe = {
      id: todos.id,
      name: todos.name,
      serves: recipeJson.serves,
      description: recipeJson.description,
      ingredients: recipeJson.ingredients,
      method: recipeJson.method,
    }

    return recipe
  } catch (error) {
    console.error("Error fetching recipe:", error)
    return ""
  }
}

export async function fetchRecipesCardData(count: number) {
  const client = generateClient<Schema>()

  try {
    const response = await client.models.Recipes.list({
      filter: { isActive: { eq: true } },
      limit: count,
    })

    if (response.data) {
      const recipes: RecipeCards = response.data.map((recipe) => ({
        id: recipe.id,
        name: recipe.name,
      }))

      return recipes
    }

    return ""
  } catch (error) {
    console.error("Error fetching recipes: ", error)
  }
}
