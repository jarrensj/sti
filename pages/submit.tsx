import Form from "../components/Form";
import { Roboto } from "next/font/google";
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

import Link from "next/link";

export default function Submit() {
  return (
    <main
      className={`${roboto.className} flex min-h-screen flex-col items-center p-24`}
    >
      <div className="container bg-blue-300">
        <div id="header">
          <Link href="/">← Back</Link>
        </div>

        <h1>Submit Potential Exposure</h1>
        <p className="mb-6">
          Make the world a better place by submitting a potential exposure you
          had! Whether your the giver, or the receiver, letting your partner
          know they could be at risk without letting them know who you are is a
          great way to keep that pristine image, but also be responsible!
        </p>
        <Form />
      </div>
    </main>
  );
}
