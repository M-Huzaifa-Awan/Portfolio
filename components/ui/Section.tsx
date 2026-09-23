import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
};

export function Section({
  id,
  children,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-0 py-16 sm:py-28 lg:scroll-mt-[-1.25rem] lg:py-32",
        className,
      )}
    >
      <div className={cn("container-x", containerClassName)}>{children}</div>
    </section>
  );
}
