import { useState } from "react";
import OTPGenerator from "../components/OTPGenerator";
import User from "../components/User";

import { Source_Code_Pro } from "next/font/google";
const scp = Source_Code_Pro({ subsets: ["latin"] });

export default function Check() {
  const [verifiedUser, setVerifiedUser] = useState<string>("");

  const updateVerifiedUser = (user) => {
    setVerifiedUser(user);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className={scp.className}>
        <div className="container bg-red-300">
          <h1>Check Exposure Notifications</h1>
          <p className="mb-6">
            Make the world a better place by checking if you were potentially
            exposed to an sti risk! As the saying goes, it's better to be safe
            than sorry! And don't forget, we are MAKING THE WORLD A BETTER
            PLACE!
          </p>
          <OTPGenerator updateVerifiedUser={updateVerifiedUser} />
          <User user={verifiedUser} />
        </div>
      </div>
    </main>
  );
}
