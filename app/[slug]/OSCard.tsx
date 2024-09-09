import info from "@/info.json";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const OSCard = () => {
  return (
    <Card className="max-w-sm h-fit">
      <CardHeader className="">
        <CardTitle>{info.os.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col w-full gap-4">
        <div>
          <div className="text-sm text-muted-foreground mb-1">Version</div>
          <div className="text-xl font-bold tabular-nums leading-none">
            {info.os.version}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground mb-1">Variant</div>
          <div className="text-xl font-bold tabular-nums leading-none">
            {info.os.variant}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground mb-1">Atomic</div>
          <div className="text-xl font-bold tabular-nums leading-none">
            {info.os.atomic ? "Yes" : "No"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
