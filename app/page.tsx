import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
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
      <Link href="/submit"><button>go to submit page</button></Link>
      <p>You are cared for and loved by people.</p>
      <p>You can check what messages you have received by typing your number and verifying you have that number by receiving a one-time password on your phone.</p>
      <Link href="/check"><button>Check what messages your number has received</button></Link>
    </main>
  )
}
