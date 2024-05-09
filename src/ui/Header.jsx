import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/UserName";

function Header() {
  return (
    <div className={"bg-yellow-400 uppercase px-4 py-3 border-b border-stone-200 sm:px-6 flex justify-between items-center"}>
      <Link to={"/"} className="tracking-widest">
        Fast-react-Pizza co.
      </Link>
      <SearchOrder />
      <Username />
    </div>
  );
}

export default Header;
