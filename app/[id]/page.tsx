import { getRequestContext } from "@cloudflare/next-on-pages";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

export const runtime = "edge";

const View = dynamic(() => import("./view"), { ssr: false });

const Page = async ({ params }: { params: { id: string } }) => {
  const {
    env: { BOBA_KV: kv },
  } = getRequestContext();

  const data = await kv.get(`uploads/${params.id}`);

  if (data === null) {
    notFound();
  }

  return <View data={data} />;
};

export default Page;
