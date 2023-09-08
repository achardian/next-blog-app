import Link from "next/link";
import { Roboto_Slab } from "next/font/google";

const logoFont = Roboto_Slab({ subsets: ["latin"], weight: "700" });

const Logo = () => {
  return (
    <Link href='/' className='text-3xl flex font-bold'>
      <h1 className={`text-[#382bf0] ${logoFont.className}`}>B</h1>
      <h1 className='text-[#a688fa]'>urogu</h1>
    </Link>
  );
};

export default Logo;
