"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PlanForm from "@/components/PlanForm";
import { createPlan } from "@/services/plans";
import { getSession } from "@/services/session";

export default function NewPlanPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleAdd(
    plan: Omit<Parameters<typeof createPlan>[0], "userId">
  ) {
    const { id } = getSession();
    if (!id) {
      setError("Debes iniciar sesión para publicar un plan");
      return;
    }

    try {
      await createPlan({ ...plan, userId: id });
      router.push("/plans");
    } catch (error) {
      setError(error instanceof Error ? error.message : "No se pudo crear el plan");
    }
  }

  return (
    <main className="flex-1 bg-slate-50 px-6 py-12 md:px-24">
      <PlanForm onAdd={handleAdd} />
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </main>
  );
}