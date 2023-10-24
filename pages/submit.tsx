import Form from "../components/Form";

import Link from "next/link";

export default function Submit() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="container">
        <h1>Submit Potential Exposure</h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          By logging in, you accept our
          <Link className="text-blue-500 hover:text-blue-700" href="#">
            terms
          </Link>
          and
          <Link className="text-blue-500 hover:text-blue-700" href="#">
            privacy policy
          </Link>
          .{"\n                            "}
        </p>
        <Form />
      </div>
    </main>
  );
}
