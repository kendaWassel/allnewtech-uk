"use client";
import Link from "next/link";
import Image from "next/image";
import HamMenu from "../ui/HamMenu";
import { useState, useEffect } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const [isLargeScreen, setIsLargeScreen] = useState(false);

useEffect(() => {
  const checkScreen = () => setIsLargeScreen(window.innerWidth >= 1024);
  checkScreen();
  window.addEventListener('resize', checkScreen);
  return () => window.removeEventListener('resize', checkScreen);
}, []);

const isLight = isLargeScreen ? (scrolled || hovered) : false;

  return (
    <header className="sticky top-0 z-1000 group/header">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`flex items-center justify-between lg:px-[var(--inline-padding)] py-4 w-full relative transition-colors duration-300 lg:h-[85px] md:h-[65px] sm:h-[60px] h-[50px] ${
          isLight
            ? "bg-[var(--white)]"
            : "lg:bg-transparent bg-white"
        }`}
      >
        <Link href="/" className="absolute left-[calc(var(--small-padding)_-_15px)] lg:left-[var(--inline-padding)] top-0 w-[150px] sm:w-[180px] lg:w-[230px] h-[50px] sm:h-[60px] lg:h-[85px] flex items-center z-10">
          <Image
            src={isLight ? "/logo-scroll.png" : "/logo-white.png"}
            alt="All New Tech Logo"
            width={230}
            height={90}
            priority
            sizes="(min-width: 1024px) 230px, (min-width: 640px) 180px, 95px"
            className="object-contain p-0 hidden lg:block"
          />
            <Image
            src="/logo-scroll.png"
            alt="All New Tech Logo"
            width={230}
            height={90}
            priority
            sizes="95px"
            className="object-cover block lg:hidden"
          />
        </Link>

        <nav aria-label="Main navigation" className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
          <ul className="flex items-center xl:gap-[4.5rem] gap-[1rem]">
            {[
              { href: "/about", label: "About Us" },
              { href: "/services", label: "Services", hasDropdown: true },
              { href: "/projects", label: "Projects" },
              { href: "/contact-us", label: "Contact Us" },
            ].map((item) => (
              <li key={`${item.href}-${item.label}`} className="relative group">
                <Link
                  href={item.href}
                  className={`font-bold transition-colors duration-300 ${
                    isLight ? "text-[var(--secondary)]" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
                {item.hasDropdown && (
                  <div className="absolute top-full start-1/2 -translate-x-1/2 rtl:translate-x-1/2 pt-2 w-[280px] z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150">
                    <div className="bg-[#00b2e3] shadow-lg">
                      <div className="flex flex-col py-6 px-8 gap-6">
                        <Link href="/services/home-solutions" className="text-white font-bold text-center hover:opacity-80 transition-opacity">
                          Home Services
                        </Link>
                        <Link href="/services/commercial-solutions" className="text-white font-bold text-center hover:opacity-80 transition-opacity">
                          Commercial Services
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <HamMenu />
      </div>
    </header>
  );
};

export default Header;