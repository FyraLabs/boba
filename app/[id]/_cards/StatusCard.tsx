import byteSize from "byte-size";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { Status } from "@/lib/schema";
dayjs.extend(duration);
dayjs.extend(relativeTime);

export const StatusCard = ({
  kernel,
  root_disk_free,
  root_filesystem,
  uptime,
}: Status) => {
  const free = byteSize(root_disk_free);

  return (
    <Card className="max-w-sm h-fit">
      <CardHeader className="">
        <CardTitle>Status</CardTitle>
      </CardHeader>
      <CardContent className="grid flex-col w-full gap-4 grid-cols-2">
        <div>
          <div className="text-sm text-muted-foreground mb-1">Uptime</div>
          <div className="text-xl font-bold tabular-nums leading-none">
            {dayjs.duration(uptime * 10 ** 6, "ms").humanize()}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground mb-1">Kernel</div>
          <div className="text-xl font-bold tabular-nums leading-none break-all">
            {kernel}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground mb-1">Disk Free</div>
          <div className="text-xl font-bold tabular-nums leading-none">
            {free.value}{" "}
            <span className="text-sm font-normal text-muted-foreground">
              {free.unit}
            </span>
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground mb-1">Filesystem</div>
          <div className="text-xl font-bold tabular-nums leading-none">
            {root_filesystem}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
