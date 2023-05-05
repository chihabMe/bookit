import Image from "next/image";
import React from "react";
import Container from "~/components/wrappers/Container";

const Footer = () => {
  return (
    <footer className="  bg-primary py-8 text-white">
      <Container>
        <div className="mt-8 flex flex h-[300px]  flex-col items-center  justify-center  text-sm">
          <p>&copy; 2023 Imaginary Food Ordering App. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
