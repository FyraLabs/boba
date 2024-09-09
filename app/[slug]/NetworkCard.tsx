import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import info from "@/info.json";

export const NetworkCard = () => {
  return (
    <Card className="max-w-sm h-fit">
      <CardHeader className="">
        <CardTitle>Network</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {info.network_devices.map((device, i) => (
          <>
            {i !== 0 ? <Separator /> : null}
            <div className="grid flex-col w-full gap-4 grid-cols-2">
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Device #{i}
                </div>
                <div className="text-xl font-bold tabular-nums leading-none">
                  {device.interface}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Type</div>
                <div className="text-xl font-bold tabular-nums leading-none">
                  {device.type}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Connected
                </div>
                <div className="text-xl font-bold tabular-nums leading-none">
                  {device.connected ? "Yes" : "No"}
                </div>
              </div>
            </div>
          </>
        ))}
      </CardContent>
    </Card>
  );
};
