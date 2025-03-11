import { NextApiRequest, NextApiResponse } from "next";
// import {} from 'formidable'

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function upload(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    res.json("Test");
  }
}
