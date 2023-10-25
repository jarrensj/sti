import { useState } from "react";
import OTPGenerator from "../components/OTPGenerator";
import User from "../components/User";
import { Roboto } from "next/font/google";
const roboto = Roboto({ weight: "400", subsets: ["latin"] });
import Link from "next/link";

export default function Check() {
  const [verifiedUser, setVerifiedUser] = useState<string>("");

  const updateVerifiedUser = (user: string) => {
    setVerifiedUser(user);
  };

  return (
    <main
      className={`${roboto.className} flex min-h-screen flex-col items-center p-24`}
    >
      <div className="container bg-blue-300">
        <div id="header">
          <Link href="/">← Back</Link>
        </div>
        <h1>Check Exposure Notifications</h1>
        <p className="mb-6">
          Make the world a better place by checking if you were potentially
          exposed to an sti risk! As the saying goes, it&apos;s better to be
          safe than sorry!
        </p>
        <p className="mb-6">
          Everyone can&apos;t just randomly check on someone&apos;s potential
          exposure so you&apos;ll have to verify your phone number before
          proceeding! Enter your phone number below to get a one time password
          that you&apos;ll enter to get access to your notifications!
        </p>
        <OTPGenerator updateVerifiedUser={updateVerifiedUser} />
        <User user={verifiedUser} />
      </div>
    </main>
  );
}
