import { HandCoins } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full header-container">
      <div className="wrapper flex-start">
        <div className="flex-start gap-2">
          <div>
            <HandCoins width={50} height={50} />
          </div>
          <div className="">
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
