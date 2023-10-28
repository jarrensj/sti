import Form from '../components/Form'
import NavBar from '../components/NavBar'
import { Roboto } from 'next/font/google';
const roboto = Roboto({ weight: "400", subsets: ['latin'] })

export default function Submit() {
  return (
    <main className={`${roboto.className} flex min-h-screen flex-col items-center p-24`}>
     <NavBar /> 
     <Form />
    </main>
  )
}
