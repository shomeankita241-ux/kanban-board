import Counter from "@/components/Counter";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl p-6 space-y-8">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold">Kanban Board — Starter</h1>
        <p className="text-neutral-600">Next.js + Tailwind + shadcn is wired up.</p>
        <div className="flex gap-3">
          <Button>Shadcn Button</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Counter Demo</h2>
        <Counter initial={0} />
      </section>
    </main>
  );
}
