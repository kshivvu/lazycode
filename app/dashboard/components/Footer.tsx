import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col space-y-4 justify-center items-center  relative bottom-0 w-full">
      <div className="w-full h-px bg-gray-500"></div>
      <div>
        <Github size={20} />
      </div>
      <p className="text-sm">&copy;2025 {" "}
        <Link href="https://instagram.com/kshivvu" target='_blank' className="italic ">@kshivvu{" "}</Link>
        All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
