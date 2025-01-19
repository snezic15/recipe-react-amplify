import React from "react"
import styles from "./Homepage.module.css"
import Carousel from "../../components/carousel/Carousel"
import Header from "../header/Header"
import Footer from "../footer/Footer"

function Homepage() {
  const sampleRecipes = [
    {
      id: "recipe-1",
      imageSrc: "temp/temp_photo.jpg",
      imageAlt: "Sample Recipe 1",
      recipeName: "Sample Recipe 1",
    },
    {
      id: 2,
      imageSrc: "temp/temp_photo.jpg",
      imageAlt: "Sample Recipe 2",
      recipeName: "Sample Recipe 2",
    },
    {
      id: 3,
      imageSrc: "temp/temp_photo.jpg",
      imageAlt: "Sample Recipe 3",
      recipeName: "Sample Recipe 3",
    },
    {
      id: 4,
      imageSrc: "temp/temp_photo.jpg",
      imageAlt: "Sample Recipe 4",
      recipeName: "Sample Recipe 4",
    },
    {
      id: 5,
      imageSrc: "temp/temp_photo.jpg",
      imageAlt: "Sample Recipe 5",
      recipeName: "Sample Recipe 5",
    },
  ]

  return (
    <div className={styles.homepage}>
      <Header />
      <main>
        <section className={styles.welcomeSection}>
          <div className={styles.welcomeContainer}>
            <h1>Welcome to the website!</h1>
            <p>Sample text</p>
            <div className={styles.buttonContainer}>
              <button className={styles.joinButton}>JOIN NOW</button>
              <button className={styles.loginButton}>LOG IN</button>
            </div>
          </div>
        </section>

        <section className={styles.featuredRecipes}>
          <h2>Try something new!</h2>
          <Carousel recipes={sampleRecipes} />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Homepage
