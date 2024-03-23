"use client";
import {
  Home,
  Dices,
  Wallet,
  PlusSquare
} from "lucide-react";
import { ReactNode, createContext } from "react";

export interface Link {
  href: string;
  label: string;
  icon: ReactNode;
  iconSelected?: ReactNode;
}

interface LinksContextValue {
  links: Link[];
}

export const NavLinksContext = createContext<LinksContextValue>(
  {} as LinksContextValue,
);

export const NavLinksProvider = ({ children }: { children: ReactNode }) => {
  const links: Link[] = [
    {
      href: "/store",
      label: "Receiver",
      icon: <Home size={26} />,
      iconSelected: <Home size={26} strokeWidth={2.5} />,
    },
    {
      href: "/store/wallet",
      label: "Wallet",
      icon: <Wallet size={26} />,
      iconSelected: <Wallet size={26} strokeWidth={2.5} />,
    }
  ];
  return (
    <NavLinksContext.Provider value={{ links }}>
      {children}
    </NavLinksContext.Provider>
  );
};
