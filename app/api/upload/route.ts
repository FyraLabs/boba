import { getRequestContext } from "@cloudflare/next-on-pages";
import { nanoid } from "nanoid";

const MAX_UPLOAD_SIZE = 2 ** 10 * 5; // 5KB
const EXPIRATION_TIME = 60 * 60 * 24 * 7; // 7 days

export const runtime = "edge";

export const POST = async (request: Request) => {
  const buf = await request.arrayBuffer();
  if (buf.byteLength > MAX_UPLOAD_SIZE)
    return Response.json({ ok: false, err: "UploadTooLarge" }, { status: 400 });

  const id = nanoid();

  const {
    env: { BOBA_KV: kv },
  } = getRequestContext();

  // Expiration time is 7 days
  await kv.put(`uploads/${id}`, buf, { expirationTtl: EXPIRATION_TIME });

  return Response.json({ ok: true, id });
};
