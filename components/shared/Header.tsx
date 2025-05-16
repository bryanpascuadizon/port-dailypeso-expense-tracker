import { HandCoins } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full header-container">
      <div className="wrapper flex-start bg-white py-3 rounded-b-sm shadow">
        <div className="flex-start gap-2 px-10">
          <div>
            <HandCoins className="w-11 h-11 md:w-13 md:h-13" />
          </div>
          <div>
            <Link href="/">
              <p className="header-title">Thriftly</p>
              <p className="header-slogan">Know Finances. Grow Freedom</p>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
