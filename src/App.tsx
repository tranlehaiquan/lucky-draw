import clsx from "clsx";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { AuthenticateContext } from "./components/Authenticate";
import Shop from "./components/Shop";
import ShopTitle from "./components/ShopTitle";
import Wheel from "./components/Wheel";
import { Shop as IShop } from "./constants";
import title from "./images/title-lucky-draw.png";
import fetchShops from "./services/fetchShops";

function App() {
  const querySearch = new URLSearchParams(window.location.search);
  const context = useContext(AuthenticateContext);

  const totalShop = querySearch.get("total")
    ? Number(querySearch.get("total"))
    : 1;
  const { isLoading, isError, data, error } = useQuery("shops", fetchShops);
  const [selectedShop, setSelectedShop] = useState<IShop[]>([]);

  return (
    <div className="app">
      <div className="grid grid-cols-2 pt-40 h-full">
        <div className="px-3">
          <div className="flex justify-center">
            <img src={title} className="max-w-lg" />
          </div>

          <Wheel shops={(data && !isLoading) ? data.data : []} />
          
          <ShopTitle />

          {[...new Array(totalShop)].map((i, index) => (
            <Shop
              storeName=""
              storeCode=""
              phoneNumber=""
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
              isLoading ? "bg-grey-100" : 'bg-white'
            )}
            disabled={isLoading}
          >
            Quay Số
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
