import Link from 'next/link'
import styles from './index.module.css'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
     <div className="container">
        <h1>Tracker</h1>
        <ul className={styles.HomeButtonContainer}>
          <li>
            <Link
              href="/submit"
              className={
                styles["HomeButtons"] + " " + styles["HomeButtonsSubmit"]
              }
            >
              go to submit page
            </Link>
          </li>
          <li>
            <Link
              href="/check"
              className={
                styles["HomeButtons"] + " " + styles["HomeButtonsCheck"]
              }
            >
              go to check page
            </Link>
          </li>
        </ul>
      </div>
    </main>
  )
}
