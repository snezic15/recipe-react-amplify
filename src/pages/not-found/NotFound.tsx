import styles from "./NotFound.module.css"
import Header from "../header/Header"
import Footer from "../footer/Footer"

function NotFound() {
  return (
    <div className={styles.notfound}>
      <Header />
      <div className={styles.errorText}>
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist</p>
      </div>
      <Footer />
    </div>
  )
}

export default NotFound
