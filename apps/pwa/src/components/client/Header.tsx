"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();
  return (
    <>
      <header className="fixed top-0 z-20 flex h-14 w-full justify-center px-6 py-8 backdrop-blur-sm backdrop-saturate-200">
        <div className="flex w-full max-w-[75rem] items-center justify-start">
          <div>
            <Link href="/client">
              <Image
                src="/icons/icon-512x512.png"
                alt="TWQR PAY"
                width={50}
                height={50}
                priority
              />
            </Link>
          </div>
          <div className="text-2xl font-bold ml-2">TWQR PAY</div>
        </div>
      </header>
    </>
  );
}

