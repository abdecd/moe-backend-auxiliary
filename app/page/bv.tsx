import getBvSrc from "~/lib/bvSrc";
import type { Route } from "./+types/bv";
import R from "~/lib/R";
import RespJson from "~/lib/RespJson";

interface BvReq {
  qn?: string;
  bvid: string;
  p?: number;
  SESSDATA?: string;
}

export async function loader(args: Route.LoaderArgs) {
  const url = new URL(args.request.url)
  const params = Object.fromEntries(url.searchParams) as unknown as BvReq
  const { qn = 80, p = 1, bvid, SESSDATA } = params
  return RespJson(R.success(await getBvSrc(qn, p, bvid, SESSDATA)))
}