import Hero from "@/components/home/Hero";
import WorkoutLibrary from "@/components/home/WorkoutLibrary";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Hero />
      <WorkoutLibrary/>
    </main>
  );
}