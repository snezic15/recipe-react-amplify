import React from "react"
import styles from "./IngredientsSection.module.css"
import { FaPlus, FaMinus } from "react-icons/fa"

function IngredientsSection({ ingredientsSections, setIngredientsSections }) {
  const addSection = (index) => {
    // Add index parameter
    const newSections = [...ingredientsSections]
    newSections.splice(index + 1, 0, {
      // Insert after the current section
      sectionName: "",
      ingredients: [{ quantity: "", measurement: "", name: "" }],
    })
    setIngredientsSections(newSections)
  }

  const removeSection = (sectionIndex) => {
    if (ingredientsSections.length > 1) {
      const newSections = [...ingredientsSections]
      newSections.splice(sectionIndex, 1)
      setIngredientsSections(newSections)
    }
  }

  const addIngredient = (sectionIndex, ingredientIndex) => {
    // Add ingredientIndex
    const newSections = [...ingredientsSections]
    newSections[sectionIndex].ingredients.splice(ingredientIndex + 1, 0, {
      // Insert after
      quantity: "",
      measurement: "",
      name: "",
    })
    setIngredientsSections(newSections)
  }

  const removeIngredient = (sectionIndex, ingredientIndex) => {
    const newSections = [...ingredientsSections]
    if (newSections[sectionIndex].ingredients.length > 1) {
      newSections[sectionIndex].ingredients.splice(ingredientIndex, 1)
      setIngredientsSections(newSections)
    }
  }

  const handleSectionNameChange = (sectionIndex, value) => {
    const newSections = [...ingredientsSections]
    newSections[sectionIndex].sectionName = value
    setIngredientsSections(newSections)
  }

  const handleIngredientChange = (
    sectionIndex,
    ingredientIndex,
    field,
    value
  ) => {
    const newSections = [...ingredientsSections]
    newSections[sectionIndex].ingredients[ingredientIndex][field] = value
    setIngredientsSections(newSections)
  }
  const measurementOptions = [
    "tsp",
    "tbsp",
    "cup",
    "g",
    "kg",
    "ml",
    "l",
    "oz",
    "lb",
    "pinch",
    "item",
  ]

  return (
    <div className={styles.ingredientsSection}>
      <label className={styles.label}>Ingredients</label>
      {ingredientsSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className={styles.section}>
          <div className={styles.sectionHeader}>
            {/* Add Section Button */}
            <button
              type="button"
              className={`${styles.addButton} ${styles.sectionButton}`}
              onClick={() => addSection(sectionIndex)} // Pass index
            >
              <FaPlus />
            </button>

            <input
              type="text"
              placeholder="Section Name"
              value={section.sectionName}
              onChange={(e) =>
                handleSectionNameChange(sectionIndex, e.target.value)
              }
              className={styles.sectionNameInput}
            />

            {/* Remove Section Button (conditionally rendered) */}
            {ingredientsSections.length > 1 && (
              <button
                type="button"
                className={`${styles.removeButton} ${styles.sectionButton}`}
                onClick={() => removeSection(sectionIndex)}
              >
                <FaMinus />
              </button>
            )}
            {/* Placeholder for consistent spacing */}
            {ingredientsSections.length <= 1 && (
              <div
                className={`${styles.buttonPlaceholder} ${styles.sectionButtonPlaceholder}`}
              ></div>
            )}
          </div>

          {section.ingredients.map((ingredient, ingredientIndex) => (
            <div key={ingredientIndex} className={styles.ingredientLine}>
              {/* Add Ingredient Button */}
              <button
                type="button"
                className={`${styles.addButton} ${styles.ingredientButton}`}
                onClick={() => addIngredient(sectionIndex, ingredientIndex)} // Pass indices
              >
                <FaPlus />
              </button>

              <select
                value={ingredient.quantity}
                onChange={(e) =>
                  handleIngredientChange(
                    sectionIndex,
                    ingredientIndex,
                    "quantity",
                    e.target.value
                  )
                }
                className={styles.ingredientQuantity}
              >
                <option value="">-</option>
                {[...Array(100).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              <select
                value={ingredient.measurement}
                onChange={(e) =>
                  handleIngredientChange(
                    sectionIndex,
                    ingredientIndex,
                    "measurement",
                    e.target.value
                  )
                }
                className={styles.ingredientMeasurement}
              >
                <option value="">-</option>
                {measurementOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Ingredient Name"
                value={ingredient.name}
                onChange={(e) =>
                  handleIngredientChange(
                    sectionIndex,
                    ingredientIndex,
                    "name",
                    e.target.value
                  )
                }
                className={styles.ingredientName}
              />
              {/* Remove Ingredient Button (conditionally rendered) */}
              {section.ingredients.length > 1 && (
                <button
                  type="button"
                  className={`${styles.removeButton} ${styles.ingredientButton}`}
                  onClick={() =>
                    removeIngredient(sectionIndex, ingredientIndex)
                  }
                >
                  <FaMinus />
                </button>
              )}

              {/* Placeholder for consistent spacing */}
              {section.ingredients.length <= 1 && (
                <div
                  className={`${styles.buttonPlaceholder} ${styles.ingredientButtonPlaceholder}`}
                ></div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default IngredientsSection
