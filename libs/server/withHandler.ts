import { NextApiRequest, NextApiResponse } from "next";

export default async function withHandler(
  method: "GET" | "POST" | "DELETE",
  fn: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) {
      return res.status(405).end();
    }
    try {
      await fn(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}

// withHandler는 서버 측에서 특정 HTTP 메소드(예: POST)로만 요청을 받아들이고, 그 외의 요청에 대해서는 거부하는 것을 도와주는 Next.js의 미들웨어 함수입니다.
