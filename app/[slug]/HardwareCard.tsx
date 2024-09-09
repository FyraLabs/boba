import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import info from "@/info.json";
import byteSize from "byte-size";

export const HardwareCard = () => {
  const physicalMemory = byteSize(info.hardware.physical_memory);
  const usableMemory = byteSize(info.hardware.usable_memory);
  const swap = byteSize(info.hardware.swap);

  return (
    <Card className="max-w-sm h-fit">
      <CardHeader className="">
        <CardTitle>Hardware</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid w-full gap-4 grid-cols-2">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Vendor</div>
            <div className="text-xl font-bold tabular-nums leading-none">
              {info.hardware.vendor}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Product</div>
            <div className="text-xl font-bold tabular-nums leading-none break-all">
              {info.hardware.product}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              Physical Memory
            </div>
            <div className="text-xl font-bold tabular-nums leading-none">
              {physicalMemory.value}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                {physicalMemory.unit}
              </span>
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">
              Usable Memory
            </div>
            <div className="text-xl font-bold tabular-nums leading-none">
              {usableMemory.value}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                {usableMemory.unit}
              </span>
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Swap</div>
            <div className="text-xl font-bold tabular-nums leading-none">
              {swap.value}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                {swap.unit}
              </span>
            </div>
          </div>
        </div>
        {info.hardware.cpus.map((cpu, i) => (
          <>
            <Separator />
            <div className="flex flex-col gap-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  CPU #{i}
                </div>
                <div className="text-xl font-bold tabular-nums leading-none">
                  {cpu.model}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Arch</div>
                <div className="text-xl font-bold tabular-nums leading-none">
                  {cpu.arch}
                </div>
              </div>
            </div>
          </>
        ))}
        {info.hardware.gpus.map((gpu, i) => (
          <>
            <Separator />
            <div className="flex flex-col gap-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  GPU #{i}
                </div>
                <div className="text-xl font-bold tabular-nums leading-none">
                  {gpu.name}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Driver</div>
                <div className="text-xl font-bold tabular-nums leading-none">
                  {gpu.driver}
                </div>
              </div>
            </div>
          </>
        ))}
      </CardContent>
    </Card>
  );
};
