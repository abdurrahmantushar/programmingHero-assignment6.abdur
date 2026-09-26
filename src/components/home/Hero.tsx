
import Image from "next/image";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-7 sm:px-6 lg:px-8">
      <div className="relative min-h-[448px] overflow-hidden rounded-xl border border-[#252832] bg-[#15171D] ">
        <div className="relative z-10 flex min-h-[300px] items-center px-6 py-10 lg:py-20 sm:px-10 lg:w-[558px] lg:px-10 ">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#C2F800]">
              WORKOUT LIBRARY
            </p>

            <h1 className="font-heading whitespace-nowrap text-3xl font-bold uppercase leading-[0.95] text-white sm:text-4xl lg:text-[60px]">
              TRAIN WITH INTENT. LOG
              <br />
              EVERY SET.
            </h1>

            <p className="mt-5 max-w-[550px] text-[11px] leading-[1.6] text-[#9A9FA8] sm:text-[16px]">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today's plan, and watch the week's work add up.
            </p>

            <a
              href="#library"
              className="mt-8 inline-flex rounded bg-[#C2F800] px-4 py-2 text-[12px] font-bold uppercase text-black transition hover:bg-[#d0ff33]"
            >
              Browse Workouts
            </a>
          </div>
        </div>

        <div className="absolute inset-y-0 right-0 hidden w-1/2 items-center justify-center lg:flex">
          <Image
            src="/herobanner.png"
            alt="Fitness workout"
            width={334}
            height={334}
            className=" w-auto object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}