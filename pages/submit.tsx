import Form from '../components/Form'
import NavBar from '../components/NavBar'
import styles from './form.module.css'
import { Roboto } from 'next/font/google';
const roboto = Roboto({ weight: "400", subsets: ['latin'] })

export default function Submit() {
  return (
    <main className={roboto.className}>
      <NavBar /> 
      <div className={styles.check}>
        <Form />
      </div>
    </main>
  )
}
