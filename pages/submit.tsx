import Form from "../components/Form";

import Link from "next/link";

import { Source_Code_Pro } from "next/font/google";
const scp = Source_Code_Pro({ subsets: ["latin"] });

export default function Submit() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className={scp.className}>
        <div className="container bg-blue-300">
          <div id="header">
            <Link href="/">← Back</Link>
          </div>

          <h1>Submit Potential Exposure</h1>
          <p className="mb-6">
            Make the world a better place by submitting a potential exposure you
            had! Whether your the giver, or the receiver, letting your partner
            know they could be at risk without letting them know who you are is
            a great way to keep that pristine image, but also be responsible!
          </p>
          <Form />
        </div>
      </div>
    </main>
  );
}
