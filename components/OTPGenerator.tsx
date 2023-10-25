import { useState, useEffect } from "react";
import { Roboto } from "next/font/google";
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

type ChildProps = {
  updateVerifiedUser: (user: string) => void;
};

const OTPGenerator: React.FC<ChildProps> = ({ updateVerifiedUser }) => {
  const [phone, setPhone] = useState<string>("");
  const [otp, setOTP] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [verifiedUser, setVerifiedUser] = useState<string>("");

  useEffect(() => {
    updateVerifiedUser(verifiedUser);
  }, [updateVerifiedUser, verifiedUser]);

  const handleSendOTP = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(""); // reset message

    try {
      const response = await fetch("/api/generateOTP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      if (response.ok) {
        setMessage("OTP has been sent to your phone.");
        setOtpSent(true);
      } else {
        const data = await response.json();
        setMessage(data.error);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(""); // reset message

    try {
      const response = await fetch("/api/verifyOTP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });

      if (response.ok) {
        setMessage("OTP verification successful!");
        setOtpSent(false);

        setVerifiedUser(phone);

        setPhone("");
        setOTP("");
      } else {
        const data = await response.json();
        setMessage(data.error);
      }
    } catch (error) {
      setMessage("error");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={roboto.className}>
      {!otpSent ? (
        <form onSubmit={handleSendOTP} className={roboto.className}>
          <div className="flex flex-col gap-2">
            <label htmlFor="tel">Phone Number</label>
            <input
              className="w-100 p-2 mb-1 border-gray-600 bg-blue-100 rounded"
              type="tel"
              id="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#4285F4] text-white hover:bg-blue-700 py-4 rounded-md mt-4"
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOTP} className={roboto.className}>
          <div className="flex flex-col gap-2">
            <label htmlFor="otp">Enter OTP:</label>
            <input
              className="w-100 p-2 mb-1 border-gray-600 bg-blue-100 rounded"
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#4285F4] text-white hover:bg-blue-700 py-4 rounded-md mt-4"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}
      {message && <p className="text-xl text-center mt-6">{message}</p>}
    </div>
  );
};

export default OTPGenerator;
