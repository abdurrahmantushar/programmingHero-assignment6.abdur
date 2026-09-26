
"use client";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#252932] bg-[#0d0f12]">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-bold text-white"
        >
            <Image src='/logo.png'
            alt="fitlog"
            width={20}
            height={20}/>
          <span className="w-55px h-28px">FITLOG</span>
        </Link>

        <p className="text-center text-xs text-[#777D87] sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}

