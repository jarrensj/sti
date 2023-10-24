import { useState } from 'react';
import OTPGenerator from '../components/OTPGenerator'
import User from '../components/USer'

export default function Check() {
  const [verifiedUser, setVerifiedUser] = useState<string>('');

  const updateVerifiedUser = (user) => {
    setVerifiedUser(user);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
     check
     <OTPGenerator updateVerifiedUser={updateVerifiedUser} />
     <User user={verifiedUser} />
    </main>
  )
}
