import clsx from "clsx";
import React from "react";
import { Shop } from "../../constants";

interface Props extends Shop {
  className?: string;
  secondary?: boolean;
}

const ShopItem: React.FC<Props> = ({ name, code, phone, className, secondary }) => {
  return (
    <div className={className}>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="bg-shopItem p-1 mt-2">
            <div className={clsx("w-full h-8", secondary ? 'bg-blue-400' : 'bg-heliotrope')}>{name}</div>
          </div>
        </div>
        <div className="text-center">
          <div className="bg-shopItem p-1 mt-2">
            <div className={clsx("w-full h-8", secondary ? 'bg-blue-400' : 'bg-heliotrope')}>{code}</div>
          </div>
        </div>
        <div className="text-center">
          <div className="bg-shopItem p-1 mt-2">
            <div className={clsx("w-full h-8", secondary ? 'bg-blue-400' : 'bg-heliotrope')}>{phone}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
