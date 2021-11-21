import clsx from "clsx";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { AuthenticateContext } from "../components/Authenticate";
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

  const { isLoading, isError, data, error } = useQuery("shops", fetchShops);
  const [selectedShopVisiable, setSelectedShopVisiable] = useState<IShop[]>(
    [...new Array(totalShop)].map(() => generateShop())
  );
  const [selectedShop, setSelectedShop] = useState<IShop[]>([]);
  const [drawing, setDrawing] = useState(false);

  const handleDraw = async () => {
    setDrawing(true);
    const [luckyDrawRs] = await Promise.all([
      luckyDraw(totalShop),
      await delayer(3000),
    ]);
    const shops = luckyDrawRs.data || [];

    await animationDraw(shops);
  };

  const animationDraw = async (shops: IShop[]) => {
    for (let x = 0; x < shops.length; x++) {
      setDrawing(true);
      await delayer(3000);
      setSelectedShopVisiable(((curr: any) => {
        const shopVisiable = [...curr];
        shopVisiable[x] = shops[x];
        return shopVisiable;
      }) as any);
      setDrawing(false);
    }
  };

  return (
    <Layout1>
      <div className="grid grid-cols-2 pt-40 h-full">
        <div className="px-3">
          <div className="flex justify-center">
            <img src={title} className="max-w-lg" />
          </div>

          <Wheel
            shops={data && !isLoading ? data.data : []}
            drawing={drawing}
          />

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
