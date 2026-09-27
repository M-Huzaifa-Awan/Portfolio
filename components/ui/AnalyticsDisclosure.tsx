"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export function AnalyticsDisclosure({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="border-t border-line">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
        className="flex min-h-12 w-full items-center justify-between gap-4 px-5 py-3 text-left text-sm font-medium text-ink transition-colors hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:px-6"
      >
        {open ? "Hide full analytics" : "View full analytics"}
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 text-muted transition-transform duration-[400ms] motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        id={panelId}
        aria-hidden={!open}
        inert={!open}
        className="analytics-disclosure"
        data-open={open}
      >
        <div className="min-h-0 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
