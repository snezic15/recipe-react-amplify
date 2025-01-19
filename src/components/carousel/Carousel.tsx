import React from "react"
import Slider from "react-slick"
import RecipeCard from "../recipe-card/RecipeCard"
import styles from "./Carousel.module.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

function Carousel({ recipes }) {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 3,
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
          centerMode: false, // Disable centerMode for mobile
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false, // Disable centerMode for mobile
        },
      },
    ],
  }

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        {recipes.map((recipe) => (
          <div key={recipe.id} className={styles.slide}>
            <RecipeCard
              imageSrc={recipe.imageSrc}
              imageAlt={recipe.imageAlt}
              recipeName={recipe.recipeName}
              recipeId={recipe.id}
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Carousel
