import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, phone } = req.body;
  const payload = phone ? { phone: +phone } : { email };

  const user = await client.user.upsert({
    // upsert: update, insert 둘 다 가능, 이 메소드를 사용하기 위해서는 where, create, update가 필요
    where: {
      // where: 조건
      ...(phone ? { phone: +phone } : {}), // 객체를 동적으로 다루기 위한 방법
      ...(email ? { email } : {}), // 객체안에서 if else를 사용하기 위한 es6 문법
    },
    create: {
      // where에 해당하는 데이터가 없을 때, create에 해당하는 데이터를 생성
      name: "Anonymous",
      ...(phone ? { phone: +phone } : {}),
      ...(email ? { email } : {}),
    },
    update: {}, // where에 해당하는 데이터가 있을 때, update에 해당하는 데이터로 업데이트
  });

  // if (email) {
  //   // client.user -> prisma가 자동으로 생성해준 client, 유저 테이블에 접근할 수 있음
  //   user = await client.user.findUnique({
  //     where: {
  //       email,
  //     },
  //   });
  //   if (user) console.log("user", user);
  //   if (!user) {
  //     user = await client.user.create({
  //       data: {
  //         name: "Anonymous",
  //         email,
  //       },
  //     });
  //   }
  // }
  // if (phone) {
  //   user = await client.user.findUnique({
  //     where: {
  //       phone: +phone,
  //       // string -> number로 변환
  //     },
  //   });
  //   if (user) console.log("user", user);
  //   if (!user) {
  //     user = await client.user.create({
  //       data: {
  //         name: "Anonymous",
  //         phone: +phone,
  //       },
  //     });
  //   }
  // }
  return res.status(200);
}

export default withHandler("POST", handler);
