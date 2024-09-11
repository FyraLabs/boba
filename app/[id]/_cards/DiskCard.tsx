import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Disk } from "@/lib/schema";
import { Fragment } from "react";

export const DiskCard = ({ disks }: { disks: Disk[] }) => {
  return (
    <Card className="max-w-sm h-fit">
      <CardHeader className="text-2xl">
        <CardTitle>Disks</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {disks.map(({ controller, model, name, type }, i) => (
          <Fragment key={name}>
            {i !== 0 ? <Separator /> : null}
            <div className="grid flex-col w-full gap-4 grid-cols-2">
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Disk #{i}
                </div>
                <div className="text-xl font-bold tabular-nums leading-none">
                  {model}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Type</div>
                <div className="text-xl font-bold tabular-nums leading-none">
                  {type}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Controller
                </div>
                <div className="text-xl font-bold tabular-nums leading-none">
                  {controller}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Identifier
                </div>
                <div className="text-xl font-bold tabular-nums leading-none">
                  {name}
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </CardContent>
    </Card>
  );
};
