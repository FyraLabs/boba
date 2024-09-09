// Zod schema definitions and types for UM cli's output

import { z } from "zod";

export enum DisplayProtocol {
  Unknown = 0,
  Wayland = 1,
  X11 = 2,
}

const DisplayProtocolEnum = z.nativeEnum(DisplayProtocol);

const desktopSchema = z.object({
  name: z.string(),
  protocol: DisplayProtocolEnum,
});
export type Desktop = z.infer<typeof desktopSchema>;

const diskSchema = z.object({
  model: z.string(),
  name: z.string(),
  type: z.string(),
  controller: z.string(),
});
export type Disk = z.infer<typeof diskSchema>;

const cpuSchema = z.object({
  model: z.string(),
  arch: z.string(),
});
export type CPU = z.infer<typeof cpuSchema>;

const gpuSchema = z.object({
  name: z.string(),
  driver: z.string(),
});
export type GPU = z.infer<typeof gpuSchema>;

const hardwareSchema = z.object({
  vendor: z.string(),
  product: z.string(),
  cpus: z.array(cpuSchema),
  gpus: z.array(gpuSchema),
  physical_memory: z.number(),
  usable_memory: z.number(),
  swap: z.number(),
});
export type Hardware = z.infer<typeof hardwareSchema>;

const networkDeviceSchema = z.object({
  interface: z.string(),
  type: z.string(),
  connected: z.boolean(),
});
export type NetworkDevice = z.infer<typeof networkDeviceSchema>;

const osSchema = z.object({
  name: z.string(),
  version: z.string(),
  variant: z.string(),
  atomic: z.boolean(),
});
export type OS = z.infer<typeof osSchema>;

const packagesSchema = z.object({
  rpm_count: z.number(),
  system_flatpak_count: z.number(),
  user_flatpak_count: z.number(),
});
export type Packages = z.infer<typeof packagesSchema>;

const statusSchema = z.object({
  uptime: z.number(),
  kernel: z.string(),
  root_disk_free: z.number(),
  root_filesystem: z.string(),
});
export type Status = z.infer<typeof statusSchema>;

export const infoSchema = z.object({
  desktop: desktopSchema,
  disks: z.array(diskSchema),
  hardware: hardwareSchema,
  network_devices: z.array(networkDeviceSchema),
  os: osSchema,
  packages: packagesSchema,
  status: statusSchema,
});
export type Info = z.infer<typeof infoSchema>;
