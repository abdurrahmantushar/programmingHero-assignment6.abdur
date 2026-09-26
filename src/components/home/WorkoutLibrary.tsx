"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Clock3, Flame, Star } from "lucide-react";
import { getWorkouts } from "@/lib/api";
import type { Workout } from "@/types/workout";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const data = await getWorkouts();
        setWorkouts(data);
      } catch {
        setError("Failed to load workouts.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <section
      id="library"
      className="mx-auto max-w-[1440px] px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="mb-7 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-heading text-3xl font-bold uppercase leading-none text-white sm:text-4xl">
            The Library
          </h2>

          <p className="mt-2 text-xs text-[#9A9FA8] sm:text-sm">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
      </div>

      {loading && (
        <div className="flex min-h-[300px] items-center justify-center">
          <p className="text-sm text-[#9A9FA8]">Loading workouts...</p>
        </div>
      )}

      {error && !loading && (
        <div className="flex min-h-[300px] items-center justify-center">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 justify-items-center gap-5 md:grid-cols-2 xl:grid-cols-3">
          {workouts.map((workout) => (
            <Link
              key={workout.id}
              href={`/workouts/${workout.id}`}
              className="group block h-[368px] w-full max-w-[390px] overflow-hidden rounded-xl border border-[#252932] bg-[#15171D] transition-colors duration-300 hover:border-[#3A414B]"
            >
              <div className="relative h-45 overflow-hidden bg-[#20242C]">
                <img
                  src={workout.image}
                  alt={workout.name}
                  className="h-[210px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <div className="mb-3 flex flex-wrap gap-2">
                  {workout.muscleGroups.map((muscle, index) => (
                    <span
                      key={`${workout.id}-${muscle}-${index}`}
                      className="rounded-full bg-[#C2F800] px-2.5 py-1 text-[11px] font-bold uppercase leading-none text-black"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>

                <h3 className="font-heading text-xl font-bold uppercase leading-tight text-white">
                  {workout.name}
                </h3>

                <p className="mt-1.5 text-[13px] text-[#9298A2]">
                  {workout.equipment}
                </p>

                <div className="mt-7 flex items-center gap-5 pt-4 text-xs text-[#9298A2]">
                  <div className="flex items-center gap-1.5">
                    <Clock3 size={14} strokeWidth={1.5} />
                    <span>{workout.duration} min</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Flame
                      size={14}
                      fill="currentColor"
                      strokeWidth={1.5}
                    />
                    <span>{workout.caloriesBurned} kcal</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Star size={14} strokeWidth={1.5} />
                    <span>{workout.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}