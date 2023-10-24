import styles from "./results.module.css";

export default function Results({ message }) {
  const [verifiedUser, setVerifiedUser] = useState<string>("");

  const updateVerifiedUser = (user) => {
    setVerifiedUser(user);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className={styles.ResultsContainer}>
        <p>{message}</p>
      </div>
    </main>
  );
}
