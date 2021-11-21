import clsx from "clsx";
import KeenSlider from "keen-slider/react";
import { sortBy, uniqBy } from "lodash";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
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

function App() {
  const querySearch = new URLSearchParams(window.location.search);

  const totalShop = querySearch.get("total")
    ? Number(querySearch.get("total"))
    : 1;

  const { isLoading, data } = useQuery("shops", fetchShops);

  const [selectedShops, setSelectedShops] = useState<IShop[]>([]);
  const [selectedShopVisiable, setSelectedShopVisiable] = useState<IShop[]>(
    [...new Array(totalShop)].map(() => generateShop())
  );
  const [drawing, setDrawing] = useState(false);
  const ref = useRef<KeenSlider>();

  const handleDraw = async () => {
    setSelectedShopVisiable(
      [...new Array(totalShop)].map(() => generateShop())
    );
    setDrawing(true);
    const [luckyDrawRs] = await Promise.all([
      luckyDraw(totalShop),
      await delayer(3000),
    ]);
    const shops = luckyDrawRs.data || [];
    setSelectedShops(shops);
    setTimeout(() => {
      animationDraw(shops);
    }, 0);
  };

  const animationDraw = async (shops: IShop[]) => {
    const shopsDraw = sortBy(uniqBy<IShop>(
      [...selectedShops, ...(data && !isLoading ? data.data : [])],
      "storeCode"
    ), 'storeName');

    for (let x = 0; x < shops.length; x++) {
      setDrawing(true);
      await delayer(3000);
      setDrawing(false);
      await delayer(50);
      const index = shopsDraw.findIndex((i) =>  i.storeName === shops[x].storeName);
      ref.current && ref.current.moveToSlide(index);
      await delayer(50);
      setSelectedShopVisiable(((curr: any) => {
        const shopVisiable = [...curr];
        shopVisiable[x] = shops[x];
        return shopVisiable;
      }) as any);
      await delayer(1000);
    }
  };

  const shopsDraw = sortBy(uniqBy(
    [...selectedShops, ...(data && !isLoading ? data.data : [])],
    "storeCode"
  ), 'storeName');

  return (
    <Layout1>
      <div className="grid grid-cols-2 pt-40 h-full">
        <div className="px-3">
          <div className="flex justify-center">
            <img src={title} className="max-w-lg" alt="text" />
          </div>

          <Wheel shops={shopsDraw} drawing={drawing} wheelRef={ref} />

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
        <div className="flex items-end justify-center h-full pb-32">
          <button
            className={clsx(
              "px-5 py-2 rounded-lg uppercase font-bold border-2 border-grey",
              isLoading ? "bg-grey-100" : "bg-white"
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
