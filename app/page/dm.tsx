import getDanmaku from "~/lib/getDanmaku";
import R from "~/lib/R";
import type { Route } from "../+types/root";
import RespJson from "~/lib/RespJson";

interface DmReq {
  type?: number;
  bvid: string;
  p?: number;
  segment_index?: number;
  SESSDATA?: string;
}

export async function loader(args: Route.LoaderArgs) {
  const url = new URL(args.request.url)
  const params = Object.fromEntries(url.searchParams) as unknown as DmReq
  const { type = 1, bvid, p = 1, segment_index = 1, SESSDATA } = params
  return RespJson(R.success(await getDanmaku(type, bvid, p, segment_index, SESSDATA)))
}