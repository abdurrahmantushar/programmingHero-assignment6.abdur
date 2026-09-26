"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ArrowLeft, CalendarPlus, Bookmark } from "lucide-react";
import { useParams } from "next/navigation";
import { getWorkoutById } from "@/lib/api";
import type { Workout } from "@/types/workout";

export default function WorkoutDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isAdded, setIsAdded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getWorkoutById(id);

        setWorkout(data);

        const plan = JSON.parse(
          localStorage.getItem("fitlog-plan") || "[]"
        );

        const saved = JSON.parse(
          localStorage.getItem("fitlog-saved") || "[]"
        );

        setIsAdded(
          plan.some((item: Workout) => item.id === data.id)
        );

        setIsSaved(
          saved.some((item: Workout) => item.id === data.id)
        );
      } catch {
        setError("Workout not found.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWorkout();
    }
  }, [id]);

const handleAddToPlan = () => {
  if (!workout) return;

  const plan = JSON.parse(
    localStorage.getItem("fitlog-plan") || "[]"
  );

  const alreadyAdded = plan.some(
    (item: Workout) => item.id === workout.id
  );

  if (alreadyAdded) {
    return;
  }

  const updatedPlan = [...plan, workout];

  localStorage.setItem(
    "fitlog-plan",
    JSON.stringify(updatedPlan)
  );

  setIsAdded(true);
  window.dispatchEvent(new Event("fitlog-update"));
  toast.success("Workout added to today's plan!");
};

const handleSave = () => {
  if (!workout) return;

  const saved = JSON.parse(
    localStorage.getItem("fitlog-saved") || "[]"
  );

  const alreadySaved = saved.some(
    (item: Workout) => item.id === workout.id
  );

  if (alreadySaved) {
    return;
  }

  const updatedSaved = [...saved, workout];

  localStorage.setItem(
    "fitlog-saved",
    JSON.stringify(updatedSaved)
  );

  setIsSaved(true);
  window.dispatchEvent(new Event("fitlog-update"));
  toast.success("Workout saved for later!");
};

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0f1014]">
        <p className="text-sm text-[#9298A2]">
          Loading workout...
        </p>
      </main>
    );
  }

  if (error || !workout) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0f1014] px-4">
        <div className="text-center">
          <p className="text-sm text-red-400">
            {error || "Workout not found."}
          </p>

          <Link
            href="/"
            className="mt-5 inline-flex items-center gap-2 text-sm text-[#9298A2] transition-colors hover:text-[#C2F800]"
          >
            <ArrowLeft size={16} />
            Back to Library
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f1014] px-4 py-8 sm:px-6 lg:px-8 lg:py-11">
      <div className="mx-auto max-w-[1200px] border-t border-[#20232a] pt-9">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10">
          <div className="relative h-[540px] overflow-hidden rounded-xl bg-[#20242c] sm:h-[600px] lg:h-[740px]">
            <img
              src={workout.image}
              alt={workout.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="font-heading text-3xl font-bold uppercase leading-tight text-white sm:text-4xl lg:text-[30px]">
              {workout.name}
            </h1>

            <p className="mt-3 max-w-[520px] text-sm leading-6 text-[#9298A2]">
              {workout.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle, index) => (
                <span
                  key={`${workout.id}-${muscle}-${index}`}
                  className="rounded-full bg-[#C2F800] px-3 py-1 text-[10px] font-bold text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            <div className="mt-5 overflow-hidden rounded-xl border border-[#252932] bg-[#1E2330]">
              <div className="flex items-center justify-between border-b border-[#252932] px-4 py-3">
                <span className="text-[10px] font-bold uppercase tracking-wide text-[#8D939D]">
                  Equipment
                </span>
                <span className="text-xs text-[#E1E3E7]">
                  {workout.equipment}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#252932] px-4 py-3">
                <span className="text-[10px] font-bold uppercase tracking-wide text-[#8D939D]">
                  Difficulty
                </span>
                <span className="text-xs text-[#E1E3E7]">
                  {workout.difficulty}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#252932] px-4 py-3">
                <span className="text-[10px] font-bold uppercase tracking-wide text-[#8D939D]">
                  Sets
                </span>
                <span className="text-xs text-[#E1E3E7]">
                  {workout.sets}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#252932] px-4 py-3">
                <span className="text-[10px] font-bold uppercase tracking-wide text-[#8D939D]">
                  Reps
                </span>
                <span className="text-xs text-[#E1E3E7]">
                  {workout.reps}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#252932] px-4 py-3">
                <span className="text-[10px] font-bold uppercase tracking-wide text-[#8D939D]">
                  Duration
                </span>
                <span className="text-xs text-[#E1E3E7]">
                  {workout.duration} min
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#252932] px-4 py-3">
                <span className="text-[10px] font-bold uppercase tracking-wide text-[#8D939D]">
                  Calories
                </span>
                <span className="text-xs text-[#E1E3E7]">
                  {workout.caloriesBurned} kcal
                </span>
              </div>

              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-[10px] font-bold uppercase tracking-wide text-[#8D939D]">
                  Rating
                </span>
                <span className="text-xs text-[#E1E3E7]">
                  {workout.rating}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="font-heading text-sm font-bold uppercase text-white">
                Instructions
              </h2>

              <div className="mt-3 space-y-2">
                {workout.instructions.map((instruction, index) => (
                  <div
                    key={`${workout.id}-instruction-${index}`}
                    className="flex gap-3"
                  >
                    <span className="w-4 shrink-0 text-[11px] text-[#777D87]">
                      {index + 1}.
                    </span>

                    <p className="text-[11px] leading-5 text-[#B5BAC3]">
                      {instruction}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleAddToPlan}
                disabled={isAdded}
                className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-[11px] font-bold transition-all duration-200 ${
                  isAdded
                    ? "bg-[#273018] text-[#C2F800]"
                    : "bg-[#C2F800] text-black hover:bg-[#d2ff25]"
                }`}
              >
                <CalendarPlus size={14} />

                {isAdded
                  ? "Added to today's plan"
                  : "Add to today's plan"}
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={isSaved}
                className={`inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-3 text-[11px] font-medium transition-all duration-200 ${
                  isSaved
                    ? "border-[#C2F800] text-[#C2F800]"
                    : "border-[#343944] text-[#D5D8DE] hover:border-[#C2F800] hover:text-[#C2F800]"
                }`}
              >
                <Bookmark size={14} />

                {isSaved ? "Saved" : "Save for later"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}