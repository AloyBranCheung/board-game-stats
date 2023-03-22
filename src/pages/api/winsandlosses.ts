// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import auth from "src/firebase-admin/firebaseAdmin";

type Data = {
  status: number;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if ("token" in req.body) {
      const { token } = req.body;
      const decodedToken = await auth.verifyIdToken(token);
      if (!decodedToken)
        return res
          .status(401)
          .json({ status: 401, message: "Invalid credentials" });

      return res.status(200).json({ status: 500, message: "Ok" });
    }
    throw new Error("No token in body");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return res
      .status(401)
      .json({ status: 401, message: "Invalid credentials" });
  }
}
