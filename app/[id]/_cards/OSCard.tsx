import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { OS } from "@/lib/schema";

export const OSCard = ({ name, version, variant, atomic }: OS) => {
  return (
    <Card className="max-w-sm h-fit">
      <CardHeader className="">
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col w-full gap-4">
        <div>
          <div className="text-sm text-muted-foreground mb-1">Version</div>
          <div className="text-xl font-bold tabular-nums leading-none">
            {version}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground mb-1">Variant</div>
          <div className="text-xl font-bold tabular-nums leading-none">
            {variant}
          </div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground mb-1">Atomic</div>
          <div className="text-xl font-bold tabular-nums leading-none">
            {atomic ? "Yes" : "No"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
