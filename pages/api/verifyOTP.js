import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL,
  token: process.env.NEXT_PUBLIC_REDIS_REST_TOKEN,
})
const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2, "3 s")
})

export default async function handler(req, res) {
  const user_ip = req.headers["x-forwarded-for"];
  const { success } = await rateLimiter.limit(user_ip);

  if (!success) {
    return res.status(429).json({ error: "Too Many Requests" });
  }

  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const mongoClient = new MongoClient(process.env.NEXT_PUBLIC_MONGODB_URI);
  await mongoClient.connect();
  const otps = mongoClient.db().collection("otps");

  try {
    // TODO: verify only works if there is just one document in the database with that phone number 
    // Fetch the OTP record from the database
    const otpRecord = await otps.findOne({ phone: req.body.phone });

    if (!otpRecord) {
      return res.status(400).json({ error: "Invalid phone number or OTP" });
    }

    // // Check if the OTP has expired
    // if (Date.now() > otpRecord.expiry) {
    //   return res.status(400).json({ error: "OTP has expired" });
    // }

    // Check if the OTPs match
    const otpMatch = await bcrypt.compare(
      req.body.otp.toString(),
      otpRecord.otp
    );
    if (!otpMatch) {
      return res.status(400).json({ error: "Invalid phone number or OTP" });
    }

    // OTP is valid and has not expired, so we can delete it now
    await otps.deleteOne({ phone: req.body.phone });

    // Respond with a success status
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not verify OTP" });
  } finally {
    await mongoClient.close();
  }
}