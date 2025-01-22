import Header from "../header/Header"
import Footer from "../footer/Footer"
import { FileUploader } from "@aws-amplify/ui-react-storage"
import "@aws-amplify/ui-react/styles.css"
import React, { useState } from "react"

function SuggestRecipe() {
  const [recipeName, setRecipeName] = useState<string>("")

  const setName = (event) => {
    setRecipeName(event.target.value)
  }

  const processFile = async ({ file }) => {
    return { file, key: `image.jpg` }
  }

  return (
    <div>
      <Header />
      <h1>Suggest a Recipe</h1>
      <input
        name="recipe-name"
        type="text"
        value={recipeName}
        onChange={setName}
      />
      {recipeName && (
        <FileUploader
          acceptedFileTypes={["image/*"]}
          path={`recipes/${recipeName.replace(" ", "-")}/`}
          autoUpload={false}
          maxFileCount={1}
          isResumable
          processFile={processFile}
        />
      )}
      <Footer />
    </div>
  )
}

export default SuggestRecipe
