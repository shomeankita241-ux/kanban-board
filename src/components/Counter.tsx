"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = { initial?: number };

export default function Counter({ initial = 0 }: Props) {
  const [count, setCount] = useState<number>(initial);

  return (
    <div className="flex items-center gap-3 rounded-xl border p-3">
      <Button variant="outline" aria-label="decrement" onClick={() => setCount(c => c - 1)}>
        −
      </Button>
      <span className="w-10 text-center font-mono text-lg tabular-nums">{count}</span>
      <Button aria-label="increment" onClick={() => setCount(c => c + 1)}>
        +
      </Button>
      <Button variant="ghost" aria-label="reset" onClick={() => setCount(initial)}>
        Reset
      </Button>
    </div>
  );
}
