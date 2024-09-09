import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import info from "@/info.json";

export const DiskCard = () => {
  return (
    <Card className="max-w-sm h-fit">
      <CardHeader className="">
        <CardTitle>Disks</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {info.disks.map((disk, i) => (
          <>
            {i !== 0 ? <Separator /> : null}
            <div className="grid flex-col w-full gap-4 grid-cols-2">
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Disk #{i}
                </div>
                <div className="text-xl font-bold tabular-nums leading-none">
                  {disk.model}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Type</div>
                <div className="text-xl font-bold tabular-nums leading-none">
                  {disk.type}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Controller
                </div>
                <div className="text-xl font-bold tabular-nums leading-none">
                  {disk.controller}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Identifier
                </div>
                <div className="text-xl font-bold tabular-nums leading-none">
                  {disk.name}
                </div>
              </div>
            </div>
          </>
        ))}
      </CardContent>
    </Card>
  );
};
