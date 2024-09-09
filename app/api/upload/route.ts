import { EXPIRATION_TIME, MAX_UPLOAD_SIZE } from "@/lib/constants";
import { arrayBufferToHex } from "@/lib/utils";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { nanoid } from "nanoid";

export const runtime = "edge";

export const POST = async (request: Request) => {
  const buf = await request.arrayBuffer();
  if (buf.byteLength > MAX_UPLOAD_SIZE)
    return Response.json({ ok: false, err: "UploadTooLarge" }, { status: 400 });

  const id = nanoid();

  const {
    env: { BOBA_KV: kv },
  } = getRequestContext();

  const hex = arrayBufferToHex(buf);

  // You know, I'd just put the bytes here, but for some reason the KV API (ONLY IN MINIFLARE) fucks out
  // I regret using Cloudflare pages
  await kv.put(`uploads/${id}`, hex, {
    expirationTtl: EXPIRATION_TIME,
  });

  return Response.json({ ok: true, id });
};
