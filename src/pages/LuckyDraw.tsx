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
      await delayer(500);

      setSelectedShopVisiable(((curr: any) => {
        const shopVisiable = [...curr];
        shopVisiable[x] = shopsLucky[x];
        return shopVisiable;
      }) as any);
      await delayer(3000);
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
      <div className="grid grid-cols-2 pt-40 h-full">
        <div className="px-3">
          <div className="flex justify-center">
            <img src={title} className="max-w-lg" alt="text" />
          </div>

          {!dirty ? (
            <div className="bg-shopItem p-1 mt-2 w-2/5 ml-auto mr-auto mb-5">
              <div className="w-full h-8 text-white flex items-center justify-center bg-heliotrope uppercase font-bold">
                Tên Gian Hàng
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
        {!isLoading && <div className="fixed top-4 right-4 uppercase font-bold text-blue-600">
          {totalShop === 1 && <Link className="bg-white py-3 px-5 rounded-2xl" to="/draw5">Đi đến giải khuyến khích →</Link>}
          {totalShop === 5 && <Link className="bg-white py-3 px-5 rounded-2xl" to="/draw">Đi đến giải đặc biệt →</Link>}
        </div>}

        <div className="flex items-end justify-end h-full pb-5 pr-5">
          {dirty && (
            <button
              className={clsx(
                "px-5 py-2 rounded-lg uppercase font-bold mr-2.5",
                isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-white"
              )}
              onClick={reset}
              disabled={isLoading}
            >
              Đặt Lại
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
            Quay Số
          </button>
        </div>
      </div>
    </Layout1>
  );
}

export default App;
