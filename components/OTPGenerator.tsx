import { useState, useEffect } from "react";

import Results from "./results";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div>
      {!otpSent ? (
        <div>
          <form onSubmit={handleSendOTP}>
            <label>
              Phone Number:
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </label>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        </div>
      ) : (
        <div>
          <form onSubmit={handleVerifyOTP}>
            <Label>
              Enter OTP:
              <Input
                type="text"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                required
              />
            </Label>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>
        </div>
      )}
      {message && <Results message={message} />}
    </div>
  );
};

export default OTPGenerator;
