import { useState } from 'react';
import OTPGenerator from '../components/OTPGenerator'
import User from '../components/User'
import { Roboto } from 'next/font/google';
const roboto = Roboto({ weight: "400", subsets: ['latin'] })

export default function Check() {
  const [verifiedUser, setVerifiedUser] = useState<string>('');

  const updateVerifiedUser = (user:string) => {
    setVerifiedUser(user);
  };

  return (
    <main className={`${roboto.className} flex min-h-screen flex-col items-center p-24`}>
     check
     <OTPGenerator updateVerifiedUser={updateVerifiedUser} />
     <User user={verifiedUser} />
    </main>
  )
}
