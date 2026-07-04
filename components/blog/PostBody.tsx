import Link from "next/link";
import type { ReactNode } from "react";
import type { Block } from "@/lib/posts";

/** Minimal inline parser: **bold**, `code`, and [text](url) links. */
function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex =
    /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(`([^`]+)`)/g;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;

  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1]) {
      const label = m[2];
      const href = m[3];
      const internal = href.startsWith("/") || href.startsWith("#");
      nodes.push(
        internal ? (
          <Link
            key={key++}
            href={href}
            className="text-accent underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent-hover"
          >
            {label}
          </Link>
        ) : (
          <a
            key={key++}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline decoration-accent/40 underline-offset-2 transition-colors hover:text-accent-hover"
          >
            {label}
          </a>
        ),
      );
    } else if (m[4]) {
      nodes.push(
        <strong key={key++} className="font-semibold text-ink">
          {m[5]}
        </strong>,
      );
    } else if (m[6]) {
      nodes.push(
        <code
          key={key++}
          className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-ink"
        >
          {m[7]}
        </code>,
      );
    }
    last = regex.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function PostBody({ body }: { body: Block[] }) {
  return (
    <div className="space-y-6">
      {body.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="pt-4 font-heading text-2xl font-bold text-ink sm:text-3xl"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                className="pt-2 font-heading text-xl font-semibold text-ink"
              >
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="text-[15px] leading-relaxed text-muted sm:text-base">
                {renderInline(block.text)}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-2.5 pl-1">
                {block.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-[15px] leading-relaxed text-muted sm:text-base">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{renderInline(it)}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="space-y-2.5">
                {block.items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-[15px] leading-relaxed text-muted sm:text-base">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-accent/30 bg-accent/10 text-xs font-semibold text-accent">
                      {j + 1}
                    </span>
                    <span className="pt-0.5">{renderInline(it)}</span>
                  </li>
                ))}
              </ol>
            );
          case "code":
            return (
              <pre
                key={i}
                className="overflow-x-auto rounded-2xl border border-line bg-black/40 p-4 text-sm leading-relaxed text-ink/90"
              >
                <code className="font-mono">{block.code}</code>
              </pre>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-accent pl-5 text-lg font-medium italic leading-relaxed text-ink"
              >
                {renderInline(block.text)}
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
