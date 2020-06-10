import { sign } from "jsonwebtoken";

//  send to users
export const createAccessToken = (user: any) => {
  return sign(
    { userId: user.SubscriptionUserId },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "15m",
    }
  );
};

// store in cookie
export const createRefreshToken = (user: any) => {
  return sign(
    { userId: user.SubscriptionUserId },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};
