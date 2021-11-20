import Shop from "./components/Shop";
import ShopTitle from "./components/ShopTitle";
import Wheel from "./components/Wheel";
import title from "./images/title-lucky-draw.png";

function App() {
  const querySearch = new URLSearchParams(window.location.search);

  const totalShop = querySearch.get("total")
    ? Number(querySearch.get("total"))
    : 1;

  return (
    <div className="app">
      <div className="grid grid-cols-2 pt-40">
        <div className="px-3">
          <div className="flex justify-center">
            <img src={title} className="max-w-lg" />
          </div>

          <Wheel />
          <ShopTitle />
          {[...new Array(totalShop)].map((i, index) => (
            <Shop
              name=""
              code=""
              phone=""
              key={index}
              secondary={(index + 1) % 2 === 0}
              className="mb-2"
            />
          ))}
        </div>
        <div className="flex items-end justify-center h-full">
          <button className="bg-white px-5 py-2 rounded-lg uppercase font-bold border-2 border-grey">Quay Số</button>
        </div>
      </div>
    </div>
  );
}

export default App;
