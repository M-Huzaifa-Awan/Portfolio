import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Background } from "@/components/Background";
import { LogoMark } from "@/components/ui/LogoMark";
import { SITE } from "@/lib/data";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Background />
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <nav className="glass flex w-full max-w-content items-center justify-between rounded-2xl px-4 py-3 shadow-card sm:px-5">
          <Link href="/" className="group flex items-center gap-2.5" aria-label="Home">
            <LogoMark className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
            <span className="text-sm font-semibold tracking-tight">Huzaifa Awan</span>
          </Link>
          <Link
            href="/#contact"
            className="hidden items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-black shadow-glow-sm transition-all duration-300 hover:bg-accent-hover hover:shadow-glow sm:inline-flex"
          >
            Book a Call
          </Link>
        </nav>
      </header>

      <main className="relative z-10 min-h-screen pt-28">{children}</main>

      <footer className="relative z-10 border-t border-line py-10">
        <div className="container-x flex flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
          <Link href="/" className="inline-flex items-center gap-2 transition-colors hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> Back to portfolio
          </Link>
          <p>
            © {new Date().getFullYear()} {SITE.name}
          </p>
        </div>
      </footer>
    </>
  );
}
