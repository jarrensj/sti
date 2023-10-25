import Image from "next/image";
import Link from "next/link";

import { Roboto } from "next/font/google";
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`${roboto.className} flex min-h-screen flex-col items-center p-24`}
    >
      <div className="container bg-blue-300">
        <h1>Tracker</h1>
        <p className="mb-6">
          Welcome! We&apos;re helping you reduce the risk of sti transmission,
          in turn helping you stay healthy and, last but not least, MAKE THE
          WORLD A BETTER PLACE.
        </p>
        <ul className="flex flex-col gap-4">
          <li>
            <Link
              className="block bg-blue-100 text-center max-w-sm rounded-lg shadow-lg p-12  border border-gray-200 dark:border-gray-700"
              href="/submit"
            >
              Submit An Exposure
            </Link>
          </li>
          <li>
            <Link
              className="block  bg-blue-100 text-center max-w-sm rounded-lg shadow-lg p-12  border border-gray-200 dark:border-gray-700"
              href="/check"
            >
              Check Your Exposure
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
