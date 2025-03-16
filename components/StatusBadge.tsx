import clsx from "clsx";
import Image from "next/image";

import { Status } from "@/types";

export const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx("status-badge", {
        "bg-green-100": status === "meýilleşdirilen",
        "bg-blue-100": status === "garaşylýar",
        "bg-red-100": status === "ýatyrylan",
      })}
    >
      <Image
        src={
          status === "meýilleşdirilen"
            ? "/assets/icons/check.svg"
            : status === "garaşylýar"
              ? "/assets/icons/pending.svg"
              : status === "ýatyrylan"
                ? "/assets/icons/cancelled.svg"
                : "/assets/icons/cancelled.svg"
        }
        alt="doctor"
        width={24}
        height={24}
        unoptimized
        className="h-fit w-3"
      />
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-blue-500": status === "meýilleşdirilen",
          "text-green-500": status === "garaşylýar",
          "text-red-500": status === "ýatyrylan",
        })}
      >
        {status}
      </p>
    </div>
  );
};
