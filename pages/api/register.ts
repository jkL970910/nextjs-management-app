import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { createJWT, hashPassword } from "@/lib/auth";
import { serialize } from "cookie";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const user = await db.user.create({
      data: {
        email: req.body.email,
        password: await hashPassword(req.body.password),
        firstName: req.body.firstName,
        lastName: req.body.lastName
      },
    });

    // why not localstorage: 1) the server side are responsible to set the localstorage to every single req each time
    // 2)we'll use nextjs middleware, which runs on the edge before our server to verify JWT which is out side of ur computer and don't have access to the localstorage
    const jwt = await createJWT(user)
    res.setHeader(
      'Set-Cookie',
      serialize(process.env.COOKIE_NAME, jwt, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      })
    );

    res.status(201);
    res.json({});
  } else {
    res.status(402);
    res.json({});
  }
}