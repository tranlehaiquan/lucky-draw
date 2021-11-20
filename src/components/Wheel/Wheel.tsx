import React from "react";
import clsx from "clsx";

interface Props {
  className?: string;
}

const Wheel: React.FC<Props> = ({ className }) => {
  return (
    <div className={clsx("bg-shopItem w-2/5 p-1 ml-auto mr-auto mb-5", className)}>
      <div className="bg-heliotrope w-full h-8 text-white font-bold uppercase flex justify-center items-center">
        Tên Gian Hàng
      </div>
    </div>
  );
};

export default Wheel;
