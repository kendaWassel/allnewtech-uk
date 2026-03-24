"use client";
import Link from "next/link";
import Image from "next/image";
import HamMenu from "../ui/HamMenu";

const Header = () => {

  return (
    <header className="sticky top-0 z-1000">
      <div className="flex items-center justify-between lg:px-[var(--inline-padding)] py-4 w-full relative bg-[var(--white)] lg:h-[65px] h-[42px]">
        <Link href="/" className="absolute left-[var(--small-padding)] lg:left-[var(--inline-padding)] top-0 w-[95px] sm:w-[180px] lg:w-[230px] h-[42px] sm:h-[65px] lg:h-[90px] bg-[var(--secondary)] flex items-center z-10">
          <Image
            src="/Logo-light.svg"
            alt="All New Tech Logo"
            width={230}
            height={90}
            priority
            sizes="(min-width: 1024px) 230px, (min-width: 640px) 180px, 95px"
            className="object-cover p-2 lg:p-4"
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
              <li 
                key={`${item.href}-${item.label}`}
                className="relative group"
              >
                <Link
                  href={item.href}
                  className="text-[var(--secondary)] font-bold"
                >
                  {item.label}
                </Link>
                {item.hasDropdown && (
                  <div 
                    className="absolute top-full start-1/2 -translate-x-1/2 rtl:translate-x-1/2 pt-2 w-[280px] z-50
      opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150"
                  >
                    <div className="bg-[#00b2e3] shadow-lg">
                      <div className="flex flex-col py-6 px-8 gap-6">
                        <Link
                          href="/services/home-solutions"
                          className="text-white font-bold text-center hover:opacity-80 transition-opacity"
                        >
                          Home Services
                        </Link>
                        <Link
                          href="/services/commercial-solutions"
                          className="text-white font-bold text-center hover:opacity-80 transition-opacity"
                        >
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
