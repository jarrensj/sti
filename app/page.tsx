import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="container">
        <h1>Tracker</h1>
        <ul>
          <li>
            <Link href="/submit">go to submit page</Link>
          </li>
          <li>
            <Link href="/check">go to check page</Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
