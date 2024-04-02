import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { ResponseType } from "@libs/server/withHandler";
import twilio from "twilio";
import mail from "@sendgrid/mail";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
mail.setApiKey(process.env.SENDGRID_API_KEY!);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, phone } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(10000 + Math.random() * 90000).toString();

  const token = await client.token.create({
    data: {
      token: payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });

  if (phone) {
    // await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_SERVICE_SID,
    //   to: process.env.MY_PHONE!,
    //   body: `Your token is ${payload}`,
    // });
  }
  if (email) {
    // const email = await mail.send({
    //   to: "codudals98@naver.com",
    //   from: "codudals98@naver.com",
    //   subject: "Carrot Token",
    //   text: `Your token is ${payload}`,
    //   html: `<strong> Your token is ${payload} </strong>`,
    // });
    // console.log(email);
  }

  return res.json({ ok: true });
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
