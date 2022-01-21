import clsx from "clsx";
import KeenSlider from "keen-slider/react";
import { sortBy, uniqBy } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Layout1 } from "../components/Layout";
import Shop from "../components/Shop";
import ShopTitle from "../components/ShopTitle";
import Wheel from "../components/Wheel";
import { Shop as IShop } from "../constants";
import title from "../images/title-lucky-draw.png";
import fetchShops from "../services/fetchShops";
import luckyDraw from "../services/luckyDraw";
import delayer from "../utils/deplayer";

const generateShop = (): IShop => ({
  storeName: "",
  storeCode: "",
  phoneNumber: "",
});

const App: React.FC<{ totalShop: number }> = ({ totalShop }) => {
  const querySearch = new URLSearchParams(window.location.search);
  const [isLoading, setIsLoading] = useState(false);

  const [shops, setShops] = useState<IShop[]>([]);

  const [dirty, setDirty] = useState(false);
  const [selectedShopVisiable, setSelectedShopVisiable] = useState<IShop[]>(
    [...new Array(totalShop)].map(() => generateShop())
  );
  const [drawing, setDrawing] = useState(false);
  const ref = useRef<KeenSlider>();

  const handleDraw = async () => {
    setDirty(true);
    setIsLoading(true);
    setSelectedShopVisiable(
      [...new Array(totalShop)].map(() => generateShop())
    );

    setDrawing(true);
    const [luckyDrawRs] = await Promise.all([
      luckyDraw(totalShop),
      await delayer(3000),
    ]);

    const shopsLucky = luckyDrawRs.data || [];
    const shopsMerge = uniqBy([...shopsLucky, ...shops], "storeCode");
    setShops(shopsMerge);

    setTimeout(async () => {
      await animationDraw(shopsLucky);
      setIsLoading(false);
    }, 0);
  };

  const animationDraw = async (shopsLucky: IShop[]) => {
    for (let x = 0; x < shopsLucky.length; x++) {
      setDrawing(true);

      await delayer(3000);
      setDrawing(false);
      await delayer(50);

      const index = shopsLucky.findIndex(
        (i) => i.storeName === shopsLucky[x].storeName
      );
      ref.current && ref.current.moveToSlide(index);
      await delayer(2000);

      setSelectedShopVisiable(((curr: any) => {
        const shopVisiable = [...curr];
        shopVisiable[x] = shopsLucky[x];
        return shopVisiable;
      }) as any);
      await delayer(1000);
    }
  };

  const reset = () => {
    setDirty(false);
    setSelectedShopVisiable(
      [...new Array(totalShop)].map(() => generateShop())
    );
    setDrawing(false);
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      const dataRs = await fetchShops();
      setShops(dataRs.data);
    })();
  }, []);

  return (
    <Layout1>
      <div className=" max-w-3xl mx-auto">
        <div>
          <div className="flex justify-center h-64">
            {/* <img src={title} className="max-w-lg" alt="text" /> */}
          </div>

          {!dirty ? (
            <div className="bg-shopItem p-1 mt-2 w-3/4 ml-auto mr-auto mb-5">
              <div className="w-full h-10 text-white flex items-center justify-center bg-heliotrope uppercase font-bold">
                Name
              </div>
            </div>
          ) : (
            <Wheel shops={shops} drawing={drawing} wheelRef={ref} />
          )}

          <ShopTitle />

          {selectedShopVisiable.map((i, index) => (
            <Shop
              {...i}
              key={index}
              secondary={(index + 1) % 2 === 0}
              className="mb-2"
            />
          ))}
        </div>
        {!isLoading && (
          <div className="fixed bottom-4 left-4 uppercase font-bold text-blue-600 grid grid-cols-1 gap-2">
            <Link
              className={clsx(
                "py-3 px-5 rounded-2xl bg-white",
                totalShop === 1 && "opacity-25 cursor-not-allowed pointer-events-none"
              )}
              to="/draw"
            >
              Đi đến giải đặc biệt →
            </Link>
            <Link
              className={clsx(
                "bg-white py-3 px-5 rounded-2xl",
                totalShop === 4 && "opacity-25 cursor-not-allowed pointer-events-none"
              )}
              to="/draw4"
            >
              Đi đến giải tư →
            </Link>
            <Link
              className={clsx(
                "bg-white py-3 px-5 rounded-2xl",
                totalShop === 5 && "opacity-25 cursor-not-allowed pointer-events-none"
              )}
              to="/draw5"
            >
              Đi đến giải năm →
            </Link>
          </div>
        )}

        <div className="flex items-end justify-center pb-5 fixed right-0 bottom-0 pr-4">
          {dirty && (
            <button
              className={clsx(
                "px-5 py-2 rounded-lg uppercase font-bold mr-2.5",
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-white"
              )}
              onClick={reset}
              disabled={isLoading}
            >
              Reset
            </button>
          )}
          
          <button
            className={clsx(
              "px-5 py-2 rounded-lg uppercase font-bold",
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-white"
            )}
            onClick={handleDraw}
            disabled={isLoading}
          >
            Draw
          </button>
        </div>
      </div>
    </Layout1>
  );
};

export default App;
