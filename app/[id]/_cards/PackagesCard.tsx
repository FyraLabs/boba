import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Packages } from "@/lib/schema";

export const PackagesCard = ({
  rpm_count,
  system_flatpak_count,
  user_flatpak_count,
}: Packages) => {
  return (
    <Card className="h-fit">
      <CardHeader className="text-2xl">
        <CardTitle>Packages</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col w-full gap-4">
        <div className="grid w-full gap-4 grid-cols-2">
          <div>
            <div className="text-sm text-muted-foreground mb-1">RPMs</div>
            <div className="text-xl font-bold tabular-nums leading-none">
              {rpm_count}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              System Flatpaks
            </div>
            <div className="text-xl font-bold tabular-nums leading-none">
              {system_flatpak_count}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              User Flatpaks
            </div>
            <div className="text-xl font-bold tabular-nums leading-none">
              {user_flatpak_count}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
