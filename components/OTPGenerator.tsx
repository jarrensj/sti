import { useState, useEffect } from "react";

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
    <>
      {/* {!otpSent ? ( */}
      <>
        <form onSubmit={handleSendOTP}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="tel">Phone Number: </Label>
            <Input
              className="mb-4 border-gray-600 bg-blue-100"
              type="tel"
              id="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="false"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#4285F4] text-white hover:bg-blue-700 py-6"
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </Button>
        </form>
      </>
      {/* ) : ( */}
      <>
        <form onSubmit={handleVerifyOTP}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="otp">Enter OTP: </Label>
            <Input
              className="mb-4 border-gray-600 bg-blue-100"
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#4285F4] text-white hover:bg-blue-700 py-6"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>
      </>
      {/* )} */}
      <div className="my-3">{message}</div>
    </>
  );
};

export default OTPGenerator;
