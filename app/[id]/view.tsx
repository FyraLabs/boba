"use client";

import {
  OSCard,
  StatusCard,
  DesktopCard,
  PackagesCard,
  NetworkCard,
  DiskCard,
  HardwareCard,
} from "./_cards";
import { infoSchema } from "@/lib/schema";
import { use } from "react";
import { hexToArrayBuffer } from "@/lib/utils";

const decryptSystemInfo = async (data: string, decryptionPayload: string) => {
  const dataBuffer = hexToArrayBuffer(data);
  const decryptonPayloadData = hexToArrayBuffer(decryptionPayload);
  // 32 bytes for key, 12 bytes for nonce
  if (decryptonPayloadData.byteLength != 44) {
    throw new Error(
      "The decryption payload provided is invalid, must be 44 bytes",
    );
  }

  const keyData = decryptonPayloadData.slice(0, 32);
  const nonceData = decryptonPayloadData.slice(32);

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "AES-GCM" },
    false,
    ["decrypt"],
  );
  const plaintext = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: nonceData },
    key,
    dataBuffer,
  );

  const infoObject = JSON.parse(new TextDecoder().decode(plaintext));

  return infoSchema.parse(infoObject);
};

const View = ({ data }: { data: string }) => {
  const info = use(decryptSystemInfo(data, window.location.hash.slice(1)));

  return (
    <div className="flex flex-col gap-6 p-6">
      <main className="grid grid-cols-[repeat(auto-fit,minmax(375px,max-content))] gap-6 max-w-full">
        <div className="flex flex-col gap-6">
          <OSCard {...info.os} />
          <StatusCard {...info.status} />
          <DesktopCard {...info.desktop} />
          <PackagesCard {...info.packages} />
        </div>
        <div className="flex flex-col gap-6">
          <NetworkCard devices={info.network_devices} />
          <DiskCard disks={info.disks} />
        </div>
        <div>
          <HardwareCard {...info.hardware} />
        </div>
      </main>
      <footer>
        <p className="text-muted-foreground">🄯 Fyra Labs — Boba</p>
      </footer>
    </div>
  );
};

export default View;
