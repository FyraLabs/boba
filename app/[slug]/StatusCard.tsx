import byteSize from "byte-size";
import info from "@/info.json";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(duration);
dayjs.extend(relativeTime);

export const StatusCard = () => {
  const free = byteSize(info.status.root_disk_free);

  return (
    <Card className="max-w-sm h-fit">
      <CardHeader className="">
        <CardTitle>Status</CardTitle>
      </CardHeader>
      <CardContent className="grid flex-col w-full gap-4 grid-cols-2">
        <div>
          <div className="text-sm text-muted-foreground mb-1">Uptime</div>
          <div className="text-xl font-bold tabular-nums leading-none">
            {dayjs.duration(info.status.uptime * 10 ** 6, "ms").humanize()}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground mb-1">Kernel</div>
          <div className="text-xl font-bold tabular-nums leading-none break-all">
            {info.status.kernel}
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
            {info.status.root_filesystem}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
