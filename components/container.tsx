import { cn } from "@/lib/utils";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(" w-full max-w-[1400px] min-[1800px]:max-w-screen-2xl mx-auto relative min-h-screen ", className)}>
      {children}
    </div>
  );
}
