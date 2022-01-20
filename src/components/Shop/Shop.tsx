import clsx from "clsx";
import React from "react";
import { Shop } from "../../constants";

interface Props extends Shop {
  className?: string;
  secondary?: boolean;
}

const ShopItem: React.FC<Props> = ({
  storeName,
  storeCode,
  phoneNumber,
  className,
  secondary,
}) => {
  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-4">
        <div className="">
          <div className="bg-shopItem p-1 mt-2">
            <div
              className={clsx(
                "w-full h-8 text-white flex items-center pl-1",
                secondary ? "bg-blue-400" : "bg-heliotrope"
              )}
            >
              {storeName}
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="bg-shopItem p-1 mt-2">
            <div
              className={clsx(
                "w-full h-8 text-white flex items-center justify-center",
                secondary ? "bg-blue-400" : "bg-heliotrope"
              )}
            >
              {phoneNumber}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
