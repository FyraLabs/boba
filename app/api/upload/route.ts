import { EXPIRATION_TIME, MAX_UPLOAD_SIZE } from "@/lib/constants";
import { Metadata } from "@/lib/types";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { nanoid } from "nanoid";
import { z } from "zod";

export const runtime = "edge";

// NOTE: Remember that hex encodes each byte as 2 characters
const uploadSchema = z.object({
  encrypted: z
    .string()
    .min(1)
    .regex(/^[0-9A-Fa-f]+$/)
    .max(MAX_UPLOAD_SIZE * 2),
  nonce: z
    .string()
    .regex(/^[0-9A-Fa-f]+$/)
    .length(24),
});

export const POST = async (request: Request) => {
  const form = await request.formData();
  const { success, data } = uploadSchema.safeParse(
    Object.fromEntries(form.entries()),
  );

  if (!success)
    return Response.json({ ok: false, err: "InvalidUpload" }, { status: 400 });

  const id = nanoid();

  const {
    env: { BOBA_KV: kv },
  } = getRequestContext();

  const currentTime = Math.floor(Date.now() / 1000);
  const expiration = currentTime + EXPIRATION_TIME;

  // You know, I'd just put the bytes here, but for some reason the KV API (ONLY IN MINIFLARE) fucks out
  // I regret using Cloudflare pages
  await kv.put(`uploads/${id}`, data.encrypted, {
    metadata: {
      expiration,
      nonce: data.nonce,
    } satisfies Metadata,
    expiration,
  });

  return Response.json({ ok: true, id });
};
