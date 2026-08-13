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
      className={cn("relative scroll-mt-24 py-16 sm:py-28 lg:py-32", className)}
    >
      <div className={cn("container-x", containerClassName)}>{children}</div>
    </section>
  );
}
