import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import info from "@/info.json";

export const DesktopCard = () => {
  return (
    <Card className="max-w-sm h-fit">
      <CardHeader className="">
        <CardTitle>Desktop</CardTitle>
      </CardHeader>
      <CardContent className="grid flex-col w-full gap-4 grid-cols-2">
        <div>
          <div className="text-sm text-muted-foreground mb-1">Name</div>
          <div className="text-xl font-bold tabular-nums leading-none">
            {info.desktop.name}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground mb-1">Protocol</div>
          <div className="text-xl font-bold tabular-nums leading-none">
            {info.desktop.protocol === 1
              ? "Wayland"
              : info.desktop.protocol === 2
                ? "X11"
                : "Unknown"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
