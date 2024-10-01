"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

import { IoChevronDown } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";

const navLinks = [
  {
    id: 1,
    name: "Create",
    url: "/",
    icon: <FiExternalLink />,
  },
  {
    id: 2,
    name: "Profile",
    url: "/",
    icon: <FaUser />,
  },
];

export default function Navbar() {
  const [providers, setProviders] = useState(null);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    fetchProviders();
  }, []);

  return (
    <nav className="flex-between mb-16 w-full items-center pt-6">
      <Link href="">
        <Image
          quality={95}
          priority
          src="/assets/images/logo.svg"
          alt="logo"
          width={100}
          height={40}
          className="h-[40px] w-[100px] object-contain"
        />
      </Link>
      <div>
        {session?.user ? (
          <div className="relative">
            <div className="flex items-center gap-3 md:gap-5">
              <Image
                src={session?.user?.image}
                alt="user avatar"
                width={35}
                height={35}
                className="h-[35px] w-[35px] rounded-full object-contain"
              />
              <button
                onClick={() => setIsDropdownActive((prevState) => !prevState)}
              >
                <IoChevronDown />
              </button>
            </div>
            {isDropdownActive && (
              <ul className="py-30 absolute right-0 top-10 flex h-44 w-44 flex-col gap-3 rounded-xl border bg-white px-4 py-3">
                {navLinks.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.url}
                      className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-100"
                      onClick={() =>
                        setIsDropdownActive((prevState) => !prevState)
                      }
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => {
                      setIsDropdownActive((prevState) => !prevState);
                      signOut();
                    }}
                    className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-gray-100"
                  >
                    <LuLogOut />
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </div>
        )}
      </div>
    </nav>
  );
}
