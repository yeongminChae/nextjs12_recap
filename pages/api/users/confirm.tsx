import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { ResponseType } from "@libs/server/withHandler";
import { withIronSessionApiRoute } from "iron-session/next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body;
  const exists = await client.token.findUnique({
    where: {
      token,
    },
    include: {
      user: true,
    },
  });
  if (!exists) res.status(404).end();
  req.session.user = {
    id: exists?.user.id,
  };
  await req.session.save();
  res.status(200).end();
}

export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "carrot-session",
  password: "fdfsfdsfdsfsfdfsfdsfdsfsfdfsfdsfdsfsfdfsfdsfdsfsfdfsfdsfdsfs",
});
