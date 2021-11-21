import React from "react";
import clsx from "clsx";
import WheelSlide from "./WheelSlide";
import { Shop } from "../../constants";

interface Props {
  className?: string;
  shops: Shop[];
  selected?: string;
  drawing?: boolean;
  wheelRef?: React.MutableRefObject<any>;
}

const Wheel: React.FC<Props> = ({ className, shops, selected, drawing = false, wheelRef }) => {
  return (
    <>
      <div
        className={clsx(
          "bg-shopItem w-2/5 p-1 ml-auto mr-auto mb-5",
          className
        )}
      >
        <div className="bg-heliotrope w-full h-8 text-white font-bold flex justify-center items-center overflow-hidden">
          <div
            style={{
              height: "200px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {shops && (
              <WheelSlide
                loop
                shops={shops.map((i) => i.storeName)}
                width={300}
                selected={selected}
                pause={!drawing}
                wheelRef={wheelRef}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wheel;
