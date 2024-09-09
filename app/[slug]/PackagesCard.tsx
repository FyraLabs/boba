import info from "@/info.json";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const PackagesCard = () => {
  return (
    <Card className="max-w-sm h-fit">
      <CardHeader className="">
        <CardTitle>Packages</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col w-full gap-4">
        <div className="grid w-full gap-4 grid-cols-2">
          <div>
            <div className="text-sm text-muted-foreground mb-1">RPMs</div>
            <div className="text-xl font-bold tabular-nums leading-none">
              {info.packages.rpm_count}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              System Flatpaks
            </div>
            <div className="text-xl font-bold tabular-nums leading-none">
              {info.packages.system_flatpak_count}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              User Flatpaks
            </div>
            <div className="text-xl font-bold tabular-nums leading-none">
              {info.packages.user_flatpak_count}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
