interface Ingredient {
  name: string
  quantity: number
  unit: string
}

interface IngredientSection {
  section: string
  ingredients: Ingredient[]
}

export interface Recipe {
  id: string
  name: string
  serves: number
  description: string
  ingredients: IngredientSection[]
  method: string[]
}
