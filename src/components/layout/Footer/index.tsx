import Image from "next/image";
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Container from "~/components/wrappers/Container";

const Footer = () => {
  return (
    <footer className="bg-primary py-8 text-white">
      <Container>
        <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 flex items-center md:mb-0">
            <Image
              width={70}
              height={70}
              className="h-8"
              src="/images/restaurnt.png"
              alt="Imaginary Food Ordering App"
            />
            <span className="ml-2 font-bold">Imaginary Food Ordering App</span>
          </div>
          <div className="flex items-center">
            <nav className="mr-6">
              <ul className="flex flex-wrap">
                <li className="mr-4">
                  <a className="hover:text-gray-300" href="#">
                    Home
                  </a>
                </li>
                <li className="mr-4">
                  <a className="hover:text-gray-300" href="#">
                    About
                  </a>
                </li>
                <li className="mr-4">
                  <a className="hover:text-gray-300" href="#">
                    Menu
                  </a>
                </li>
                <li className="mr-4">
                  <a className="hover:text-gray-300" href="#">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2023 Imaginary Food Ordering App. All rights reserved.</p>
          <p>Created by John Doe</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
