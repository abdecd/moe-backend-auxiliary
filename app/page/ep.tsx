import R from "~/lib/R";
import RespJson from "~/lib/RespJson";
import type { Route } from "../+types/root";
import { getMetadataByEpid } from "~/lib/bili";

interface EpReq {
  epid: string;
}

export async function loader(args: Route.LoaderArgs) {
  const url = new URL(args.request.url)
  const params = Object.fromEntries(url.searchParams) as unknown as EpReq
  const { epid } = params
  return RespJson(R.success(await getMetadataByEpid(epid)))
}