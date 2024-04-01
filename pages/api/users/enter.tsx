import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, phone } = req.body;
  let user;

  if (email) {
    // client.user -> prisma가 자동으로 생성해준 client, 유저 테이블에 접근할 수 있음
    user = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (user) console.log("user", user);
    if (!user) {
      user = await client.user.create({
        data: {
          name: "Anonymous",
          email,
        },
      });
    }
  }
  if (phone) {
    user = await client.user.findUnique({
      where: {
        phone: +phone,
        // string -> number로 변환
      },
    });
    if (user) console.log("user", user);
    if (!user) {
      user = await client.user.create({
        data: {
          name: "Anonymous",
          phone: +phone,
        },
      });
    }
  }
  return res.status(200);
}

export default withHandler("POST", handler);
