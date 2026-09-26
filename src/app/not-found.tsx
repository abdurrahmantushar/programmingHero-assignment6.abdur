import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-56px)] items-center justify-center bg-[#0f1014] px-4">
      <div className="text-center">
        <p className="font-heading text-7xl font-bold text-[#C2F800] sm:text-8xl">
          404
        </p>

        <h1 className="mt-4 font-heading text-2xl font-bold uppercase text-white sm:text-3xl">
          Page Not Found
        </h1>

        <p className="mt-2 text-xs text-[#858B95] sm:text-sm">
          The page you're looking for doesn't exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-[#C2F800] px-6 py-3 text-xs font-bold text-black transition-transform hover:scale-[1.03]"
        >
          Back to Workouts
        </Link>
      </div>
    </main>
  );
}