import { useState } from 'react';
import OTPGenerator from '../components/OTPGenerator'
import User from '../components/User'
import NavBar from '../components/NavBar'
import styles from './form.module.css'
import { Roboto } from 'next/font/google';

const roboto = Roboto({ weight: "400", subsets: ['latin'] })

export default function Check() {
  const [verifiedUser, setVerifiedUser] = useState<string>('');

  const updateVerifiedUser = (user:string) => {
    setVerifiedUser(user);
  };

  return (
    <main className={`${roboto.className} ${styles.check}`}>
     <NavBar />
     <h1>Check what messages people have sent you!</h1>
     <p>Type your phone number below and receive an one-time password to your number.</p>
     <p>Once you receive the one-time password, input it into the box and see any messages received.</p>
     <OTPGenerator updateVerifiedUser={updateVerifiedUser} />
     <User user={verifiedUser} />
    </main>
  )
}
