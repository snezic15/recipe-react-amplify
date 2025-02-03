import React, { useEffect, useState } from "react"
import Slider from "react-slick"
import RecipeCard from "../recipe-card/RecipeCard"
import styles from "./Carousel.module.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { fetchRecipeImageUrl } from "../../requests/getRecipeData"

function Carousel({ recipes }) {
  const slidesToShow = recipes.length >= 3 ? 3 : recipes.length
  const [recipeEnriched, setRecipeEnriched] = useState<
    { id: string; name: string; imageUrl: string }[]
  >([])

  useEffect(() => {
    const fetchImages = async () => {
      const enrichedRecipes = await Promise.all(
        recipes.map(async (recipe) => ({
          ...recipe,
          imageUrl: await fetchRecipeImageUrl(recipe.id),
        }))
      )

      setRecipeEnriched(enrichedRecipes)
    }

    fetchImages()
  }, [recipes])

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  }

  return (
    <div className={styles.carouselContainer}>
      {slidesToShow && (
        <Slider {...settings}>
          {recipeEnriched.map((recipe) => (
            <div key={recipe.id} className={styles.slide}>
              <RecipeCard
                imageSrc={recipe.imageUrl}
                imageAlt={recipe.name}
                recipeName={recipe.name}
                recipeId={recipe.id}
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  )
}

export default Carousel
