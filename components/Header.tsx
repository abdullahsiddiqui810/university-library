"use client";
import React from "react";
import { cn, getInitials } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "next-auth";

const Header = ({ session } : { session: Session}) => {
  const pathname = usePathname();
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" width={40} height={40} alt="logo" />
      </Link>
      <ul className="flex flex-row items-center gap-5">
        <li>
          <Link
            href="/library"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/library" ? "text-light-300" : "text-light-100",
            )}
          >
            library
          </Link>
        </li>
        <li>
          <Link href="/my-profile" className="bg-sky-500">
            <Avatar>
              <AvatarFallback className=" rounded-full">
                {getInitials(session?.user?.name || "IN")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;