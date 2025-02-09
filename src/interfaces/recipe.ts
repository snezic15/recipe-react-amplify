interface Ingredient {
  name: string
  quantity: number
  unit: string
}

interface IngredientSection {
  section: string
  ingredients: Ingredient[]
}

export interface RecipeJson {
  id: string
  name: string
  serves: number
  description: string
  ingredients: IngredientSection[]
  method: string[]
}

export interface Recipe {
  id: string
  name: string
  serves: number
  description: string
  ingredients: IngredientSection[]
  method: string[]
}

interface RecipeCardInfo {
  id: string
  name: string
  imageUrl?: string
}

export type RecipeCards = RecipeCardInfo[]
