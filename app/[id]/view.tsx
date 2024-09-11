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
import { Suspense, use } from "react";
import { hexToArrayBuffer } from "@/lib/utils";
import { Loader } from "./loader";

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
    <>
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
    </>
  );
};

export default View;
