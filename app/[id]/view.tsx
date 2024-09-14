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

const decryptSystemInfo = async (
  data: string,
  decryptionPayload: string,
  nonce: string,
) => {
  const dataBuffer = hexToArrayBuffer(data);
  const decryptonPayloadData = hexToArrayBuffer(decryptionPayload);
  const nonceData = hexToArrayBuffer(nonce);
  // 32 bytes for key, 12 bytes for nonce
  if (decryptonPayloadData.byteLength != 32) {
    throw new Error(
      "The decryption payload provided is invalid, must be 32 bytes",
    );
  }

  const keyData = decryptonPayloadData.slice(0, 32);

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

const View = ({ data, nonce }: { data: string; nonce: string }) => {
  const info = use(
    decryptSystemInfo(data, window.location.hash.slice(1), nonce),
  );

  return (
    <main className="flex flex-wrap gap-6">
      <div className="flex flex-col gap-6 basis-96 flex-1">
        <OSCard {...info.os} />
        <StatusCard {...info.status} />
        <DesktopCard {...info.desktop} />
        <PackagesCard {...info.packages} />
      </div>
      <div className="flex flex-col gap-6 basis-96 flex-1">
        <NetworkCard devices={info.network_devices} />
        <DiskCard disks={info.disks} />
      </div>
      <div className="w-sm basis-96 flex-1">
        <HardwareCard {...info.hardware} />
      </div>
    </main>
  );
};

export default View;
