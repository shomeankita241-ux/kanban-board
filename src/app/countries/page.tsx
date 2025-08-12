"use client";

import { useGetCountriesQuery } from "@/graphql/generated";

export default function CountriesPage() {
  const { data, loading, error } = useGetCountriesQuery();

  if (loading) return <main className="p-6">Loading…</main>;
  if (error) return <main className="p-6 text-red-600">Error: {error.message}</main>;

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Countries</h1>
      <ul className="space-y-2">
        {data?.countries?.map((c) => (
          <li key={c?.code} className="rounded-md border p-2">
            {c?.name} <span className="text-neutral-500">({c?.code})</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
