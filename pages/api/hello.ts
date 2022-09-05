// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  isError: boolean;
  isHeaderSameorigin?: boolean;
  data: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ isError: true, data: "Method not allowed!" });
  }
  const { url } = req;
  const url2 = url?.slice(15);
  const url3 = new URL(url2!);
  try {
    const response = await fetch(url3);
    const isHeaderSameorigin = response.headers.get("x-frame-options");
    if (isHeaderSameorigin === null) {
      return res.status(200).json({ isError: false, data: "ok" });
    } else if (isHeaderSameorigin === "SAMEORIGIN") {
      // const domain = new URL(url?.slice(15)!);
      // const hostName = domain.protocol + "//" + domain.hostname + "/";
      const resText = await response.text();
      // resText = resText
      //   .replaceAll(`href="/`, `href="${hostName}`)
      //   .replaceAll(`href="\n/`, `href="\n${hostName}`)
      //   .replaceAll(`href=\n"/`, `href=\n"${hostName}`)
      //   .replaceAll(`href\n="/`, `href\n="${hostName}`)
      return res.status(200).json({
        isError: false,
        data: resText,
        isHeaderSameorigin: true,
      });
    } else {
      throw new Error("Cannot render iframe!");
    }
  } catch (error) {
    console.log("Error:", error);
    return res.json({ isError: true, data: String(error) });
  }
}
