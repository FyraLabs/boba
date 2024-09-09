import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { NetworkDevice } from "./schema";

export const NetworkCard = (devices: NetworkDevice[]) => {
  return (
    <Card className="max-w-sm h-fit">
      <CardHeader className="">
        <CardTitle>Network</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {devices.map(({ type, interface: iface, connected }, i) => (
          <>
            {i !== 0 ? <Separator /> : null}
            <div className="grid flex-col w-full gap-4 grid-cols-2">
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Device #{i}
                </div>
                <div className="text-xl font-bold tabular-nums leading-none">
                  {iface}
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
                  Connected
                </div>
                <div className="text-xl font-bold tabular-nums leading-none">
                  {connected ? "Yes" : "No"}
                </div>
              </div>
            </div>
          </>
        ))}
      </CardContent>
    </Card>
  );
};
