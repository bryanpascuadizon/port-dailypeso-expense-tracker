import { HandCoins, CreditCard, ChartNoAxesCombined } from "lucide-react";
import { auth } from "@/auth";
import Image from "next/image";
import FooterLinks from "./FooterLinks";

const Footer = async () => {
  const session = await auth();
  const user = session?.user;

  const userName = user?.name?.split(" ")[0];
  const userImage = user?.image;

  const links = [
    {
      title: "Transactions",
      link: "/transactions/daily",
      icon: <HandCoins className="footer-icon-links" />,
    },
    {
      title: "Accounts",
      link: "/accounts",
      icon: <CreditCard className="footer-icon-links" />,
    },
    {
      title: "Summary",
      link: "/summary",
      icon: <ChartNoAxesCombined className="footer-icon-links" />,
    },
    {
      title: userName ? userName : "",
      link: "/profile",
      icon: userImage ? (
        <Image
          src={userImage}
          alt="profile picture"
          width={35}
          height={35}
          className="footer-icon-links rounded-full"
        />
      ) : (
        <div className="footer-icon-links"></div>
      ),
    },
  ];

  return <FooterLinks footerLinks={links} />;
};

export default Footer;
