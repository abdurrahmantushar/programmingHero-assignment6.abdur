"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  const isWorkoutsActive = pathname === "/";
  const isMyPlanActive = pathname === "/my-plan";

  useEffect(() => {
    const updateCounts = () => {
      const plan = JSON.parse(
        localStorage.getItem("fitlog-plan") || "[]"
      );

      const saved = JSON.parse(
        localStorage.getItem("fitlog-saved") || "[]"
      );

      setPlanCount(plan.length);
      setSavedCount(saved.length);
    };

    updateCounts();

    window.addEventListener("fitlog-update", updateCounts);

    return () => {
      window.removeEventListener("fitlog-update", updateCounts);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[#191c22] bg-[#0d0f12]">
      <nav className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-1.5 text-xs font-bold text-white sm:gap-2 sm:text-sm"
        >
          <Image
            src="/logo.png"
            alt="fitlog"
            width={20}
            height={20}
          />

          <span>FITLOG</span>
        </Link>

        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-0 sm:gap-1">
          <Link
            href="/"
            className={`rounded-full px-2.5 py-1.5 text-[10px] font-semibold transition sm:px-4 sm:text-[12px] ${
              isWorkoutsActive
                ? "bg-[#1A2312] text-[#C2F800]"
                : "text-[#C2F800] hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-2.5 py-1.5 text-[10px] font-medium transition sm:px-4 sm:text-[12px] ${
              isMyPlanActive
                ? "bg-[#1c3510] text-[var(--accent)]"
                : "text-[#9a9fa8] hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-[10px] sm:gap-5 sm:text-[12px]">
          <Link
            href="/my-plan"
            className="flex items-center gap-1 text-[#c4c7cc] transition hover:text-white sm:gap-2"
          >
            <span>Plan</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#C2F800] px-1 text-[10px] font-bold text-black sm:text-[11px]">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1 text-[#c4c7cc] transition hover:text-white sm:gap-2"
          >
            <span>Saved</span>

            <span className="flex h-4 min-w-4 items-center justify-center rounded-full border border-[#343942] px-1 text-[10px] text-[#a3a7ae] sm:text-[11px]">
              {savedCount}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
