import Header from "../header/Header"
import Footer from "../footer/Footer"
import { FileUploader } from "@aws-amplify/ui-react-storage"
import "@aws-amplify/ui-react/styles.css"
import React from "react"
import type { Schema } from "../../../amplify/data/resource"
import { generateClient } from "aws-amplify/data"
import testRecipe from "../../temp/recipe-1.json"

function SuggestRecipe() {
  const client = generateClient<Schema>()
  let recipeId = ""

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
    <div>
      <Header />
      <h1>Suggest a Recipe</h1>
      <button onClick={createData}>Create Recipe</button>
      <FileUploader
        acceptedFileTypes={["image/*"]}
        path={"recipeImages/"}
        autoUpload={false}
        maxFileCount={1}
        isResumable
        processFile={processFile}
      />
      <Footer />
    </div>
  )
}

export default SuggestRecipe
