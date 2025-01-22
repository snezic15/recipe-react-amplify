import { getUrl, downloadData } from "aws-amplify/storage"

export async function fetchRecipeImageUrl(recipeName: string) {
  try {
    const data = await getUrl({
      path: `recipes/${recipeName}/image.jpg`,
    })

    const text = await data.url.toString()
    return text
  } catch (error) {
    console.error("Error fetching recipe:", error)
    return ""
  }
}

export async function fetchRecipeText(recipeName: string) {
  try {
    const data = await downloadData({
      path: `recipes/${recipeName}/recipe.json`,
    }).result

    const text = await data.body.text()
    return text
  } catch (error) {
    console.error("Error fetching recipe:", error)
    return ""
  }
}
