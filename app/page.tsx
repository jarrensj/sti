import Link from 'next/link'
import styles from './home.module.css'
import HeartClick from '../components/HeartClick'

export default function Home() {
  return (
    <main className={styles.home}>
      <h1>hi</h1>
      <p>This app is so you can tell the people that you care about what you want to tell them anonymously!</p>
      <p>You can send messages like:</p>
      <ul>
        <li>
          “I think you need to sleep and get more hours of sleep”
        </li>
        <li>
          “I think you should check that out with a doctor just in case”
        </li>
      </ul>
      <Link href="/submit"><button className={styles.button}>go to submit page</button></Link>
      <p>You are cared for and loved by people.</p>
      <p>You can check what messages you have received by typing your number and verifying you have that number by receiving a one-time password on your phone.</p>
      <Link href="/check"><button className={styles.button}>Check what messages your number has received</button></Link>
      <HeartClick />
    </main>
  )
}
