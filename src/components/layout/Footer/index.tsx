import Image from "next/image";
import React from "react";
import Container from "~/components/wrappers/Container";

const Footer = () => {
  return (
    <footer className="  bg-gray-900 px-4 py-8 text-white">
      <Container>
        <div className=" flex  flex-col  justify-center gap-8     text-sm">
          <div className="grid md:grid-cols-2">
            <div>
              <h1 className="py-2 text-lg  font-bold capitalize text-gray-200">
                top cities
              </h1>
              <div className="grid grid-cols-1 py-2 text-sm capitalize sm:grid-cols-2 md:grid-cols-3">
                <ul className="flex flex-col gap-1.5">
                  <li>new york</li>
                  <li>los angeles</li>
                  <li>toronto</li>
                  <li>chicago</li>
                  <li>houston</li>
                  <li>broklyn</li>
                  <li>san diego</li>
                </ul>
                <ul className="flex flex-col gap-1.5">
                  <li>new york</li>
                  <li>los angeles</li>
                  <li>toronto</li>
                  <li>chicago</li>
                  <li>houston</li>
                  <li>broklyn</li>
                  <li>san diego</li>
                </ul>
                <ul className="flex flex-col gap-1.5">
                  <li>new york</li>
                  <li>los angeles</li>
                  <li>toronto</li>
                  <li>chicago</li>
                  <li>houston</li>
                  <li>broklyn</li>
                  <li>san diego</li>
                </ul>
              </div>
            </div>
            <div>
              <h1 className="py-2 text-lg  font-bold capitalize text-gray-200">
                Top Cuisines Near You
              </h1>

              <div className="grid grid-cols-1 py-2 text-sm capitalize sm:grid-cols-2 md:grid-cols-2">
                <ul className="flex flex-col gap-1.5">
                  <li>indian food</li>
                  <li>dessert near me </li>
                  <li>asian food</li>
                  <li>italian food</li>
                  <li>vegan food</li>
                  <li>mexican food</li>
                  <li>chinese food</li>
                </ul>
                <ul className="flex flex-col gap-1.5">
                  <li>indian food</li>
                  <li>dessert near me </li>
                  <li>asian food</li>
                  <li>italian food</li>
                  <li>vegan food</li>
                  <li>mexican food</li>
                  <li>chinese food</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4">
            <div className="flex flex-col gap-1">
              <h1 className="py-2 text-lg  font-bold capitalize text-gray-200">
                get to know us
              </h1>
              <ul className="flex flex-col gap-1.5 capitalize">
                <li>about us</li>
                <li>careers</li>
                <li>investors</li>
                <li>blog</li>
                <li>gift card</li>
                <li>package pickup</li>
                <li>linkedin</li>
              </ul>
            </div>
            <div className="capitalize">
              <h1 className="py-2 text-lg  font-bold capitalize text-gray-200">
                Let Us Help You
              </h1>
              <ul className="flex flex-col gap-1.5 ">
                <li>Account details</li>
                <li>order history</li>
                <li>help</li>
              </ul>
            </div>
            <div className="capitalize">
              <h1 className="py-2 text-lg  font-bold capitalize text-gray-200">
                doing business
              </h1>
              <ul className="flex flex-col gap-1.5 ">
                <li>become a partner</li>
                <li>list your business</li>
                <li>contact</li>
              </ul>
            </div>
            <div className="capitalize">
              <h1 className="py-2 text-lg  font-bold capitalize text-gray-200">
                get the app
              </h1>
              <div className="mt-2 flex flex-col gap-4">
                <div className=" flex w-[200px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-800 p-1 py-[13px] font-bold">
                  <Image
                    alt="playstore icon"
                    height={30}
                    width={30}
                    src="/images/pages/footer/playstore.png"
                  />{" "}
                  <span>play store</span>
                </div>
                <div className=" flex w-[200px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-gray-800 p-1 py-[13px] font-bold">
                  <Image
                    alt="app store icon"
                    height={30}
                    width={30}
                    src="/images/pages/footer/app-store.png"
                  />{" "}
                  <span>play store</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full text-center">
            <p>&copy 2023 Imaginary Food Ordering App. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
