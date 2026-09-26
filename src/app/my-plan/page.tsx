"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import { useEffect, useMemo, useState } from "react";
import { Clock3, Flame, X, Star } from "lucide-react";

import type { Workout } from "@/types/workout";

type PlanWorkout = Workout & {
  addedAt?: number;
};

export default function MyPlanPage() {
  const [plan, setPlan] = useState<PlanWorkout[]>([]);
  const [saved, setSaved] = useState<PlanWorkout[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog-plan");
    const savedWorkouts = localStorage.getItem("fitlog-saved");
    const savedCompleted = localStorage.getItem("fitlog-completed");

    if (savedPlan) {
      setPlan(JSON.parse(savedPlan));
    }

    if (savedWorkouts) {
      setSaved(JSON.parse(savedWorkouts));
    }

    if (savedCompleted) {
      setCompleted(JSON.parse(savedCompleted));
    }
  }, []);

  const currentWorkouts = activeTab === "today" ? plan : saved;

  const sortedWorkouts = useMemo(() => {
    const workouts = [...currentWorkouts];

    if (sortBy === "duration") {
      workouts.sort((a, b) => a.duration - b.duration);
    }

    if (sortBy === "calories") {
      workouts.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
    }

    if (sortBy === "name") {
      workouts.sort((a, b) => a.name.localeCompare(b.name));
    }

    return workouts;
  }, [currentWorkouts, sortBy]);

  const totalExercises = currentWorkouts.length;

  const totalMinutes = currentWorkouts.reduce(
    (total, workout) => total + Number(workout.duration || 0),
    0
  );

  const totalCalories = currentWorkouts.reduce(
    (total, workout) => total + Number(workout.caloriesBurned || 0),
    0
  );

  const markAsDone = (id: number) => {
    if (completed.includes(id)) {
      return;
    }

    const updatedCompleted = [...completed, id];

    setCompleted(updatedCompleted);

    localStorage.setItem(
      "fitlog-completed",
      JSON.stringify(updatedCompleted)
    );

    toast.success("Workout marked as done!");
  };

  const removeWorkout = (id: number) => {
    if (activeTab === "today") {
      const updatedPlan = plan.filter(
        (workout) => workout.id !== id
      );

      setPlan(updatedPlan);

      localStorage.setItem(
        "fitlog-plan",
        JSON.stringify(updatedPlan)
      );
    } else {
      const updatedSaved = saved.filter(
        (workout) => workout.id !== id
      );

      setSaved(updatedSaved);

      localStorage.setItem(
        "fitlog-saved",
        JSON.stringify(updatedSaved)
      );
    }

    window.dispatchEvent(new Event("fitlog-update"));
    toast.success("Workout removed from saved.");
  };

  return (
    <main className="min-h-screen bg-[#0f1014] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-[1200px]">

        <div>
          <h1 className="font-heading text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
            My Plan
          </h1>

          <p className="mt-1 text-xs text-[#858B95]">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <div className="mt-5 overflow-hidden rounded-xl border border-[#252932] bg-[#15181e]">
          <div className="grid grid-cols-3">

            <div className="border-r border-[#252932] px-4 py-5 sm:px-5">
              <p className="text-[10px] text-[#777D87]">
                Exercises
              </p>

              <p className="mt-1 font-heading text-3xl font-bold text-[#C2F800]">
                {totalExercises}
              </p>
            </div>

            <div className="border-r border-[#252932] px-4 py-5 sm:px-5">
              <p className="text-[10px] text-[#777D87]">
                Minutes
              </p>

              <p className="mt-1 font-heading text-3xl font-bold text-white">
                {totalMinutes}
              </p>
            </div>

            <div className="px-4 py-5 sm:px-5">
              <p className="text-[10px] text-[#777D87]">
                Calories
              </p>

              <p className="mt-1 font-heading text-3xl font-bold text-white">
                {totalCalories}
              </p>
            </div>

          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="inline-flex w-fit rounded-lg border border-[#252932] bg-[#15181e] p-1">
            <button
              type="button"
              onClick={() => setActiveTab("today")}
              className={`rounded-md px-4 py-2 text-[10px] font-semibold transition-all ${activeTab === "today"
                  ? "bg-[#20242c] text-white"
                  : "text-[#777D87] hover:text-white"
                }`}
            >
              Today's Plan
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`rounded-md px-4 py-2 text-[10px] font-medium transition-all ${activeTab === "saved"
                  ? "bg-[#20242c] text-white"
                  : "text-[#777D87] hover:text-white"
                }`}
            >
              Saved
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#777D87]">
              Sort By
            </span>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-lg border border-[#252932] bg-[#15181e] px-3 py-2 text-[10px] text-[#B5BAC3] outline-none"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="name">Name</option>
            </select>
          </div>

        </div>

        {sortedWorkouts.length > 0 ? (
          <div className="mt-4 space-y-3">

            {sortedWorkouts.map((workout) => {
              const isDone = completed.includes(workout.id);

              return (
                <div
                  key={workout.id}
                  className={`group rounded-xl border bg-[#15181e] p-4 transition-colors ${isDone
                      ? "border-[#C2F800]/30"
                      : "border-[#252932] hover:border-[#343944]"
                    }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                    <img
                      src={workout.image}
                      alt={workout.name}
                      className="h-24 w-full rounded-lg object-cover sm:h-20 sm:w-28"
                    />

                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/workouts/${workout.id}`}
                        className={`font-heading text-sm font-bold uppercase transition-colors ${isDone
                            ? "text-[white]"
                            : "text-white hover:text-[#C2F800]"
                          }`}
                      >
                        {workout.name}
                      </Link>

                      <div className="mt-2 text-[12px] text-[#8A92A0]">
                        {workout.equipment}
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-[white]">
                        <span className="flex items-center gap-1">
                          <Clock3 size={12} className="text-[#CCFF00]" />
                          {workout.duration} min
                        </span>

                        <span className="flex items-center gap-1">
                          <Flame size={12} className="text-[#CCFF00]" />
                          {workout.caloriesBurned} kcal
                        </span>

                        <div className="flex items-center gap-1.5">
                          <Star
                            size={14}
                            strokeWidth={2.5}
                            className="text-[#CCFF00]"
                          />
                          <span>{workout.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:shrink-0">

                      <Link
                        href={`/workouts/${workout.id}`}
                        className="rounded-2xl border border-[#343944] px-3 py-2 text-[12px] text-[#D5D8DE] transition-colors hover:border-[#C2F800] hover:text-[#C2F800]"
                      >
                        View Details
                      </Link>

                      {activeTab === "today" && (
                        <button
                          type="button"
                          onClick={() => markAsDone(workout.id)}
                          disabled={isDone}
                          className={`rounded-2xl px-3 py-2 text-[10px] font-bold transition-colors ${isDone
                              ? "bg-[#273018] text-[#C2F800]"
                              : "bg-[#C2F800] text-black hover:bg-[#d2ff25]"
                            }`}
                        >
                          {isDone ? "Done" : "Mark as Done"}
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => removeWorkout(workout.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#252932] text-[#777D87] transition-colors hover:border-red-500/40 hover:text-red-400"
                        aria-label="Remove workout"
                      >
                        <X size={14} />
                      </button>

                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        ) : (
          <div className="mt-4 flex min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-[#292d35] bg-[#101216] px-5 text-center">
            <h2 className="font-heading text-2xl font-bold uppercase text-white">
              Nothing Here Yet
            </h2>

            <p className="mt-1 max-w-[400px] text-[13px] text-[#777D87]">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/#library"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#C2F800] px-5 py-2.5 text-[13px] font-bold text-black transition-transform hover:scale-[1.03]"
            >
              Go to workouts
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}