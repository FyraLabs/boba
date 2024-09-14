import { getRequestContext } from "@cloudflare/next-on-pages";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { Loader } from "./loader";
import { Metadata } from "@/lib/types";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(duration);
dayjs.extend(relativeTime);

export const runtime = "edge";

const View = dynamic(() => import("./view"), {
  ssr: false,
  loading: () => <Loader />,
});

const Page = async ({ params }: { params: { id: string } }) => {
  const {
    env: { BOBA_KV: kv },
  } = getRequestContext();

  const { value: data, metadata } = await kv.getWithMetadata<Metadata>(
    `uploads/${params.id}`,
  );

  if (data === null || metadata === null) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <View data={data} nonce={metadata.nonce} />
      <footer>
        <p className="text-muted-foreground">
          🄯 Fyra Labs —{" "}
          <a
            href="https://github.com/FyraLabs/boba"
            className="underline underline-offset-4 hover:text-primary"
          >
            Boba
          </a>{" "}
          • Self-destructs {dayjs.unix(metadata.expiration).fromNow()}
        </p>
      </footer>
    </div>
  );
};

export default Page;
